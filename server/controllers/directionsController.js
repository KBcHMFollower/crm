const ApiError = require("../errors/ApiError")
const { Direction } = require("../models/models")

const findDirectionAttributes = {
    exclude: ["createdAt", "updatedAt"],
  };

class DirectionsController{
    async getAll(req,res,next){
        try {
            const dirs = await  Direction.findAll({
                attributes:{
                    ...findDirectionAttributes
                }
            })
            res.json(dirs)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }

    async create(req,res,next){
        try {
            const {name} = req.body
            if (!name){
                return next(ApiError.badRequest('Не указано имя роли'))
            }
            const dir = await Direction.create({name})
            res.json({
                id: dir.id,
                name: dir.name
            })
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new DirectionsController()