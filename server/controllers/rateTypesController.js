const ApiError = require("../errors/ApiError")
const { RateType } = require("../models/models")

const findRateTypeAttributes = {
    exclude: ["createdAt", "updatedAt"],
  };

class RateTypesController{
    async getAll(req,res,next){
        try {
            const rateTypes = await  RateType.findAll({
                attributes:{
                    ...findRateTypeAttributes
                }
            })
            res.json(rateTypes)
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
            const rateType = await RateType.create({name})
        res.json({
            id: rateType.id,
            name: rateType.name
        })
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new RateTypesController()