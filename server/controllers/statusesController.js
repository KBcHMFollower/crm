const ApiError = require("../errors/ApiError")
const { Status } = require("../models/models")

const findStatusesAttributes = {
    exclude: ["createdAt", "updatedAt"],
  };

class StatusesController{
    async getAll(req,res, next){
        try {
            const statuses = await  Status.findAll({
                attributes:{
                    ...findStatusesAttributes
                }
            })
            res.json(statuses)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }


    async create(req,res, next){
        try {
            const {name} = req.body
            if (!name){
                return next(ApiError.badRequest('Не указано имя статуса'))
            }
            const status = await Status.create({name})
            res.json({
                id: status.id,
                name: status.name
            })
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new StatusesController()