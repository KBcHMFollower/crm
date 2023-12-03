const ApiError = require("../errors/ApiError");
const { WorkerRate, Worker, RateType, Role, Right } = require("../models/models");
const bcrypt = require("bcrypt");
const { Op, where } = require("sequelize");
const jwt = require("jsonwebtoken");

const findWorkerAttributes = {
  exclude: ["login", "pass", "createdAt", "updatedAt", "RoleId"],
};
const findRoleAttributes = {
  exclude: ["createdAt", "updatedAt"],
};
const findRateAttributes = {
  exclude: ["createdAt", "updatedAt", "WorkerId", "RateTypeId"],
};
const findRateTypeAttributes = {
  exclude: ["createdAt", "updatedAt"],
};

const generateJwt = (id, email, role, rights) => {
  return jwt.sign(
    {
      id: id,
      email: email,
      role: role,
      rights: rights
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

const createWorkerRes = async (worker)=>{
      const workerRateOb = await worker.getWorkersRate()
      const workerRateTypeOb = await workerRateOb.getRateType()
      const workerRoleOb = await worker.getRole()

      const workerRateRes = {
        id: workerRateOb.id,
        rate: workerRateOb.rate,
        RateType:{
          id:workerRateTypeOb.id,
          name:workerRateTypeOb.name
        }
      }

      const workerRoleRes = {
        id: workerRoleOb.id,
        name: workerRoleOb.name
      }

      return {
        id: worker.id,
        fname: worker.fname,
        lname: worker.lname,
        email: worker.email,
        phone: worker.phone,
        birthday: worker.birthday,
        WorkersRate:{
          ...workerRateRes
        },
        Role:{
          ...workerRoleRes
        }
      };
}

class WorkerController {
  async login(req, res, next) {
    try {
      const { login, pass } = req.body;
      //проверка логина
      const user = await Worker.findOne({
        where: { login: login },
      });
      if (!user) {
        return next(ApiError.internal("Не правильный логин или пароль"));
      }
      //проверка пароля
      const comparePassword = bcrypt.compareSync(pass, user.pass);
      if (!comparePassword) {
        return next(ApiError.internal("Не правильный логин или пароль"));
      }

      const role = await Role.findOne({
        where: { id: user.RoleId },
        include: [
          {model:Right,
            attributes:{
              exclude:["id", "createdAt","updatedAt"]
            },
          through:{attributes:[]}}
        ]
      });


      //token
      const token = generateJwt(user.id, user.email, role.name, role.Rights.map(e=>e.name));

      res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.rights);
      res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      var { role, limit, page, name} = req.query;

      page = page || 1;
      limit = limit || 9;
      const offset = page * limit - limit;

      var Workers;
      var roleParams = {};
      var nameParams = {};

      if (role) roleParams = { ...roleParams, name: role };
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

      Workers = await Worker.findAndCountAll({
        where:{...nameParams},
        include: [
          {
            model: WorkerRate,
            attributes: {
              ...findRateAttributes,
            },
            include: [
              {
                model: RateType,
                attributes: {
                  ...findRateTypeAttributes,
                },
              },
            ],
          },
          {
            model: Role,
            where: { ...roleParams },
            attributes: {
              ...findRoleAttributes,
            },
          },
        ],
        limit,
        offset,
        attributes: {
          ...findWorkerAttributes,
        },
      });
      res.json(Workers);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return next(ApiError.badRequest("id не указан"));

      const worker = await Worker.findOne({
        where: {
          id: id,
        }})
      
        if (!worker) return next(ApiError.badRequest("нет worker с заданным id"));

      const workerRes = await createWorkerRes(worker)

      res.json(workerRes);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async create(req, res, next) {
    try {
      const {
        fname,
        lname,
        login,
        pass,
        phone,
        email,
        birthday,
        role,
        rateType,
        rate,
      } = req.body;

      //проверка для пользователя
      if (!email || !pass) {
        return next(ApiError.badRequest("некорректные логин или пароль"));
      }
      const candidate = await Worker.findOne({
        where: {
          [Op.or]: [{ login: login }, { phone: phone }, { email: email }],
        },
      });
      if (candidate) {
        console.log(candidate)
        return next(
          ApiError.badRequest(
            "пользователь с таким логином, емаилом или телефоном уже существует"
          )
        );
      }
      const findRole = await Role.findOne({
        where: { name: role },
      });
      if (!findRole) {
        return next(ApiError.badRequest("роли с заданным id не существует"));
      }

      //create user
      const hashPass = await bcrypt.hash(pass, 5);
      const birthdayDate = new Date(birthday); //todo: убарть эту строку
      const worker = await Worker.create({
        fname,
        lname,
        login,
        pass: hashPass,
        phone,
        email,
        birthday : birthdayDate,
        RoleId: findRole.id,
      });

      //проверка на rateType
      const findRateType = await RateType.findOne({
        where: { name: rateType },
      });
      if (!findRateType) {
        return next(ApiError.badRequest("роли с таким id не найдено"));
      }

      //create rateType
      const workerRate = await WorkerRate.create({
        WorkerId: worker.id,
        RateTypeId: findRateType.id,
        rate: rate,
      });


      const workerRes = await createWorkerRes(worker)
      res.json(workerRes);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { fname, lname, email, phone, birthday, role, rate, rateType } =
        req.body;

      var workerAttributes = {
        fname,
        lname,
        email,
        phone,
        birthday,
      };


      //поля worker
      if (!id) return next(ApiError.badRequest("Не указан id"));

      const worker = await Worker.findOne({
        where: { id: id },
      });
      if (!worker)
        return next(ApiError.badRequest("Работник с заданным id не найден"));

      await worker.update({
        ...workerAttributes,
      });

      //поля role
      if (role) {
        const roleOb = await Role.findOne({
          where: { name: role },
        });

        if (!roleOb) return next(ApiError.badRequest("Роли с заданным именем не существует"));

        await worker.setRole(roleOb)
      }

      const workerRateOb = await worker.getWorkersRate()
      //поля WorkerRate
      if (rate || rateType){
        if (rateType){
          const rateTypeOb = await RateType.findOne({
            where: {name:rateType}
          })

          if (!rateTypeOb) return next(ApiError.badRequest("Rate type с заданным именем нет"));

          await workerRateOb.setRateType(rateTypeOb)
          
        }
        if (rate){
          workerRateOb.update({
            rate: rate
          })
        }
      }

      const workerRes = await createWorkerRes(worker)

      res.json(workerRes);
    } catch (error) {
      return next(ApiError.badRequest(error.message));
    }
  }

  async delete(req, res,next){
    try {
      const {id} = req.params

      if (!id) return next(ApiError.badRequest('не указан id'))

      const worker = await Worker.findOne({
        where:{id:id}
      })
      if (!worker) return next(ApiError.badRequest('нет работника с заданным id'))

      const WorkerRate = await worker.getWorkersRate()
      if (WorkerRate) await WorkerRate.destroy()

      
      const deleteWorker = await worker.destroy()

      res.json(deleteWorker)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }
  
}

module.exports = new WorkerController();
