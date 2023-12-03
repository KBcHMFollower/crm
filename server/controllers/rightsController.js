const ApiError = require("../errors/ApiError");
const { Right, RolesAndRight, Role } = require("../models/models");

const findRightAttributes = {
  exclude: ["createdAt", "updatedAt"],
};

class RightsController {
  async getAll(req, res, next) {
    try {
      const rights = await Right.findAll({
        attributes: {
          ...findRightAttributes,
        },
      });
      res.json(rights);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        return next(ApiError.badRequest("Не указано имя права"));
      }
      const right = await Right.create({ name });
      res.json({
        id: right.id,
        name: right.name,
      });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async deleteRoleRight(req, res, next) {
    try {
      const {roleName, rightName} = req.body

      if (!roleName || !rightName)
        return next(ApiError.badRequest("не указан имя роли или права"));
      
      const role = await Role.findOne({
        where:{name: roleName}
      })
      if (!role)
        return next(ApiError.badRequest("нет роли с заданным именем"));

        const right = await Right.findOne({
          where:{name: rightName}
        })
        if (!right)
          return next(ApiError.badRequest("нет права с заданным именем"));


      const roleRight = await RolesAndRight.findOne({
        where: { RoleId: role.id, RightId: right.id },
      });
      if (!roleRight)
        return next(ApiError.badRequest("нет связи с заданными объектами"));

      const deleteRight = await roleRight.destroy();

      res.json(deleteRight);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async addRoleRight(req, res, next) {
    try {
      const {roleName, rightName} = req.body

      if (!roleName || !rightName)
        return next(ApiError.badRequest("не указан имя роли или права"));
      
      const role = await Role.findOne({
        where:{name: roleName}
      })
      if (!role)
        return next(ApiError.badRequest("нет роли с заданным именем"));

        const right = await Right.findOne({
          where:{name: rightName}
        })
        if (!right)
          return next(ApiError.badRequest("нет права с заданным именем"));


      const roleRight = await RolesAndRight.create( { RoleId: role.id, RightId: right.id });

      res.json(roleRight);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new RightsController();
