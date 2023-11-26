const ApiError = require("../errors/ApiError")
const { RateType } = require("../models/models")

class RateTypesController{
    async getAll(req,res,next){
        try {
            const rateTypes = await  RateType.findAll()
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
        res.json(rateType)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new RateTypesController()