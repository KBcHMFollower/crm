const ApiError = require("../errors/ApiError");
const { Right, RolesAndRight, Worker, RateType, WorkerRate, Direction, Status, Role } = require("../models/models")
const bcrypt = require("bcrypt");


const initRights = async ()=>{

}

class ItinialController{
    
    async initial(req,res,next){

        try {
            //направления
        await Direction.create({name: 'GameDev'})
        await Direction.create({name: 'VebDev'})

        //статусы

        await Status.create({name: 'In Start Lesson'})
        await Status.create({name: 'Payment Is Expected'})
        await Status.create({name: 'Submitted'})
        await Status.create({name: 'Teaching'})

        //типы ставок
        const inHour = await RateType.create({name: 'inHour'})
        const inMonth = await RateType.create({name: 'inMonth'})
        const inCount = await RateType.create({name: 'inCount'})

        //права
        const clientSecR = await Right.create({name: 'client-section'})
        const workerSecR = await Right.create({name: 'workers-section'})
        const leadSecR = await Right.create({name: 'leads-section'})
        const allR = await Right.create({name: 'all'})
        const createWorkerR = await Right.create({name: 'create-worker'})
        const createClientR = await Right.create({name: 'create-client'})
        const updateWorkerR = await Right.create({name: 'update-worker'})
        const updateClientR = await Right.create({name: 'update-client'})
        const createNoteR = await Right.create({name: 'create-note'})

        //роли
        const admin =  await Role.create({name: 'ADMIN'})
        const teacher =  await Role.create({name: 'teacher'})
        const manager =  await Role.create({name: 'manager'})

        //права ролей
        await RolesAndRight.create({
            RoleId: admin.id,
            RightId: allR.id
        })

        await RolesAndRight.create({
            RoleId: teacher.id,
            RightId: clientSecR.id
        })
        await RolesAndRight.create({
            RoleId: teacher.id,
            RightId: createNoteR.id
        })

        await RolesAndRight.create({
            RoleId: manager.id,
            RightId: clientSecR.id
        })
        await RolesAndRight.create({
            RoleId: manager.id,
            RightId: workerSecR.id
        })
        await RolesAndRight.create({
            RoleId: manager.id,
            RightId: leadSecR.id
        })
        await RolesAndRight.create({
            RoleId: manager.id,
            RightId: createClientR.id
        })
        await RolesAndRight.create({
            RoleId: manager.id,
            RightId: createWorkerR.id
        })
        await RolesAndRight.create({
            RoleId: manager.id,
            RightId: createNoteR.id
        })
        await RolesAndRight.create({
            RoleId: manager.id,
            RightId: updateClientR.id
        })
        await RolesAndRight.create({
            RoleId: manager.id,
            RightId: updateWorkerR.id
        })

        //пользователи

        const adminPass = await bcrypt.hash("admin", 5)
        const adminBd = new Date()

        const adminUser = await Worker.create({
            fname: 'admin',
            lname: 'admin',
            login :  'admin',
            pass: adminPass,
            phone: "1111",
            email : "admin@email.ru",
            birthday : adminBd,
            RoleId: admin.id,
        })

        const adminRate = await WorkerRate.create({
            WorkerId: adminUser.id,
            RateTypeId: inHour.id,
            rate: 1
        })

        res.json(adminUser)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }


    }
    
}

module.exports = new ItinialController()