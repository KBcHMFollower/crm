const ApiError = require("../errors/ApiError");
const { Client, Status, Direction } = require("../models/models");
const { Op, where } = require("sequelize");

const findDirectionAttributes = {
  exclude: ["createdAt", "updatedAt"],
};
const findStatusesAttributes = {
  exclude: ["createdAt", "updatedAt"],
};
const findClientAttributes = {
    exclude: ["createdAt", "updatedAt", "StatusId", "DirectionId"],
};

const createClientRes = async (client)=>{
  const clientDirectionOb = await client.getDirection()
      const clientStatusOb = await client.getStatus()

      const clientDirectionRes = {
        id: clientDirectionOb.id,
        name: clientDirectionOb.name
      }

      const clientStatusRes = {
        id: clientStatusOb.id,
        name: clientStatusOb.name
      }

      return clientRes = {
        id: client.id,
        lessons_count: client.lessons_count,
        fname: client.fname,
        lname: client.lname,
        email: client.email,
        phone: client.phone,
        birthday: client.birthday,
        Status:{...clientStatusRes},
        Direction: {...clientDirectionRes}
      };
}

class ClientsController {
  async getAll(req, res, next) {
    try {
        var { direction, status, limit, page, name } = req.query;
  
        page = page || 1;
        limit = limit || 9;
        const offset = page * limit - limit;
  
        var client;
        var directionParams = {};
        var statusParams = {};
        var nameParams = {};
  
        if (direction) directionParams = { ...directionParams, name: direction };
        if (status) statusParams = { ...statusParams, name: status };
        if (name) nameParams = {
          [Op.or]:{
            fname:{
              [Op.iLike]:{
                [Op.any]:[`%${name}%`]
              }
            },
            lname:{
              [Op.iLike]:{
                [Op.any]:[`%${name}%`]
              }
            }
          }
        }
  
        client = await Client.findAndCountAll({
          where:{...nameParams},
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

      const clientRes = await createClientRes(client)

      res.json(clientRes);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async update(req, res, next){
    try {
      const { id } = req.params;
      const { fname, lname, email, phone, birthday, status, direction} =
        req.body;

      var clientAttributes = {
        fname,
        lname,
        email,
        phone,
        birthday,
      };


      //поля client
      if (!id) return next(ApiError.badRequest("Не указан id"));

      const client = await Client.findOne({
        where: { id: id },
      });
      if (!client) return next(ApiError.badRequest("Клиент с заданным id не найден"));

      await client.update({
        ...clientAttributes,
      });

      //поля status
      if (status) {
        const statusOb = await Status.findOne({
          where: { name: status },
        });

        if (!statusOb) return next(ApiError.badRequest("Статус с заданным именем не существует"));

        await client.setStatus(statusOb)
      }

      //поля direction
      if (direction) {
        const directionOb = await Direction.findOne({
          where: { name: direction },
        });

        if (!directionOb) return next(ApiError.badRequest("Направления с заданным именем не существует"));

        await client.setDirection(directionOb)
      }

      const clientRes = await createClientRes(client)

      res.json(clientRes);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

//   async delete(req, res, next){
//     try {
//       const {id} = req.params
//       if (!id) return next(ApiError.badRequest("не задан id"))

//       const client = Client.findOne({
//         where:{id:id}
//       })
//       if (!client) return next(ApiError.badRequest("нет клиента с заданным id"))

//       res.json(deletedCl)

//     } catch (error) {
//       return next(ApiError.badRequest(error.message))
//     }
//   }
}

module.exports = new ClientsController();
