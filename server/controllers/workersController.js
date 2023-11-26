const ApiError = require("../errors/ApiError")
const { WorkerRate, Worker, RateType, Role } = require("../models/models")
const bcrypt = require('bcrypt')
const {Op} = require('sequelize')
const jwt = require('jsonwebtoken')


const generateJwt = (id, email, role)=>{
    return jwt.sign({
        id: id,
        email: email,
        role:role
    },
    process.env.SECRET_KEY,
    {expiresIn:'24h'}
    )
}

class WorkerController{
    async login(req,res, next){
        try {
            const {login, pass} = req.body
            //проверка логина
            const user = await Worker.findOne({
                where: {login: login}
            })
            if (!user){
                return next(ApiError.internal('Не правильный логин или пароль'))
            }
            //проверка пароля
            const comparePassword = bcrypt.compareSync(pass, user.pass)
            if (!comparePassword){
                return next(ApiError.internal('Не правильный логин или пароль'))
            }

            const role = await Role.findOne({
                where:{id: user.RoleId}
            })

            //token
            const token = generateJwt(user.id, user.email, role.name)

            res.json({token})
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async check(req,res, next){
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            res.json({token})
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req,res){
        res.json({message:'awsdaws'})
    }

    async getOne(req,res){
        
    }

    async create(req,res,next){
        try {
            const {fname, lname, login, pass, phone, email, birthdayd, roleId, rateTypeId, rate} = req.body
            
            //проверка для пользователя
            if (!email || !pass){
                return next(ApiError.badRequest('некорректные логин или пароль'))
            }
            const candidate = await Worker.findOne({
                where:{
                    [Op.or]:[
                        {login: login},
                        {pass: pass},
                        {email:email}
                    ]
                }
            })
            if (candidate){
                return next(ApiError.badRequest('пользователь с таким логином, емаилом или телефоном уже существует'))
            }
            const findRole = await Role.findOne({
                where: {id: roleId}
            })
            if (!findRole){
                return next(ApiError.badRequest('роли с заданным id не существует'))
            }
            
            //create user
            const  hashPass = await bcrypt.hash(pass, 5)
            const birthday = new Date() //todo: убарть эту строку
            const worker = await Worker.create({fname, lname, login, pass : hashPass, phone, email, birthday, RoleId: roleId})

            //проверка на rateType
            const findRateType = await RateType.findOne({
                where:{id : rateTypeId}
            })
            if (!findRateType){
                return next(ApiError.badRequest('роли с таким id не найдено'))
            }

            //create rateType
            const workerRate = await WorkerRate.create({
                WorkerId: worker.id,
                RateTypeId: rateTypeId,
                rate: rate
            })


            res.json({
                id: worker.dataValues.id,
                fname: worker.dataValues.fname,
                lname: worker.dataValues.lname,
                phone: worker.dataValues.phone,
                email: worker.dataValues.email,
                email: worker.dataValues.birthday,
                role: findRole.name,
                rateType : findRateType.name,
                rate: workerRate.rate
            })
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }

    }
}

module.exports = new WorkerController()