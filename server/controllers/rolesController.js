const ApiError = require("../errors/ApiError");
const { Role, Right, RolesAndRight } = require("../models/models");

const findRolesAttributes = {
  exclude: ["createdAt", "updatedAt"],
};

const findRightsAttributes = {
  exclude: ["createdAt", "updatedAt", "RolesAndRights"],
};

class RolesController {
  async getAll(req, res, next) {
    try {
      const roles = await Role.findAll({
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
}

module.exports = new RolesController();
