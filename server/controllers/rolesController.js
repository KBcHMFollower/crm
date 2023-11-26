const ApiError = require("../errors/ApiError")
const {Role} = require('../models/models')

class RolesController{
    async getAll(req,res,next){
        try {
            const roles = await  Role.findAll()
            res.json(roles)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }


    async create(req,res,next){
        try {
            const {name} = req.body
            if (!name){
                return next(ApiError.badRequest('Не указано имя роли'))
            }
            const role = await Role.create({name})
            res.json(role)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RolesController()