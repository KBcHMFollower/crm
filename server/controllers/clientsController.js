const ApiError = require("../errors/ApiError");
const { Client, Status, Direction } = require("../models/models");

const findDirectionAttributes = {
  exclude: ["createdAt", "updatedAt"],
};
const findStatusesAttributes = {
  exclude: ["createdAt", "updatedAt"],
};
const findClientAttributes = {
    exclude: ["createdAt", "updatedAt", "StatusId", "DirectionId"],
};

class ClientsController {
  async getAll(req, res, next) {
    try {
        var { direction, status, limit, page } = req.query;
  
        page = page || 1;
        limit = limit || 9;
        const offset = page * limit - limit;
  
        var client;
        var directionParams = {};
        var statusParams = {};
  
        if (direction) directionParams = { ...directionParams, name: direction };
        if (status) statusParams = { ...statusParams, name: status };
  
        client = await Client.findAndCountAll({
          include: [
            {
              model: Status,
              attributes: {
                ...findStatusesAttributes,
              },
              where:{...statusParams}
            },
            {
              model: Direction,
              where: { ...directionParams },
              attributes: {
                ...findDirectionAttributes,
              },
            },
          ],
          limit,
          offset,
          attributes: {
            ...findClientAttributes,
          },
        });

        res.json(client);
      } catch (error) {
        return next(ApiError.badRequest(error.message));
      }
  }

  async getOne(req, res, next) {
    try {
        const {id} = req.params
        if (!id) return next(ApiError.badRequest('id не указан'))

        const client = await Client.findOne({
            where:{
                id: id
            },
            include: [
                {
                  model: Status,
                  attributes: {
                    ...findStatusesAttributes,
                  },
                },
                {
                  model: Direction,
                  attributes: {
                    ...findDirectionAttributes,
                  },
                },
              ],
              attributes: {
                ...findClientAttributes,
              },
        })

        res.json(client)
    } catch (error) {
        next(ApiError.badRequest(error.message))
    }
  }

  async create(req, res, next) {
    try {
      var {
        fname,
        lname,
        phone,
        email,
        birthday,
        lessons_count,
        direction,
        status,
      } = req.body;
      lessons_count = lessons_count || 0;
      birthday = new Date();

      if (!status || !direction)
        return next(ApiError.badRequest("не указан статус или направление"));

      const statusOb = await Status.findOne({
        where: {
          name: status,
        },
      });
      if (!statusOb) return next(ApiError.badRequest('Статус не найден'))

      const directionOb = await Direction.findOne({
        where: { name: direction },
      });
      if (!directionOb) return next(ApiError.badRequest('Направление не найдено'))

      const client = await Client.create({
        fname,
        lname,
        phone,
        email,
        birthday,
        lessons_count,
      });
      client.setStatus(statusOb);
      client.setDirection(directionOb);

      res.json(client);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new ClientsController();
