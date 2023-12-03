const ApiError = require("../errors/ApiError");
const { Role, Right, RolesAndRight, Worker } = require("../models/models");
const { Op, where } = require("sequelize");

const findRolesAttributes = {
  exclude: ["createdAt", "updatedAt"],
};

const findRightsAttributes = {
  exclude: ["createdAt", "updatedAt", "RolesAndRights"],
};

class RolesController {
  async getAll(req, res, next) {
    try {
      const {name} = req.query

      console.log(name)

      var nameParams = {};

      if (name) nameParams = {
          name:{
            [Op.iLike]:{
              [Op.any]:[`%${name}%`]
            }
          },
        }

      const roles = await Role.findAll({
        where:{...nameParams},
        attributes: {
          ...findRolesAttributes,
        },
        include: [
          {
            model: Right,
            through: { attributes: [] },
            attributes: { ...findRightsAttributes },
          },
        ],
      });
      res.json(roles);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return next(ApiError.badRequest("нет name"));

      const role = await Role.findOne({
        where: { id: id },
        attributes: {
          ...findRolesAttributes,
        },
        include: [
            {
              model: Right,
              through: { attributes: [] },
              attributes: { ...findRightsAttributes },
            },
        ],
      });

      if (!id) return next(ApiError.badRequest("такой роли нет"));

      res.json(role);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const { name, rights } = req.body;
      if (!name) {
        return next(ApiError.badRequest("Не указано имя роли"));
      }

      const role = await Role.create({ name: name });

      await rights.forEach(async (element) => {
        const right = await Right.findOne({
          where: { name: element },
        });
        if (right)
          await RolesAndRight.create({ RoleId: role.id, RightId: right.id });
      });

      res.json(role);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next){
    try {
      const {id} = req.params

      if (!id) return next(ApiError.badRequest('не указан id'))

      const role = await Role.findOne({
        where:{id:id}
      })
      if (!role) return next(ApiError.badRequest('нет роли с заданным id'))
      if (role.name === 'default') return next(ApiError.badRequest('нельзя удалить эту роль!'))

      var defaultRole = await Role.findOne({
        where:{name : 'default'}
      })

      if (!defaultRole) defaultRole = await Role.create({name: 'default'})

      const updateWorkersRole = await Worker.update({RoleId: defaultRole.id},
        {
          where: {RoleId: id}
        })

      const deleteRoleRights = await RolesAndRight.destroy({
        where:{RoleId:id}
      })

      const deleteRole = await role.destroy()

      res.json(deleteRole)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new RolesController();
