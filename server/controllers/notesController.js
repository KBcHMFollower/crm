const ApiError = require("../errors/ApiError")
const { Note, Worker, Client } = require("../models/models")

const findNoteAttributes = {
    exclude: ["updatedAt", "createdAt"]
};

class NotesController{
    async getAll(req,res, next){
        try {
            var { clientid, workerid, limit, page } = req.query;
      
            page = page || 1;
            limit = limit || 9;
            const offset = page * limit - limit;
      
            var notes;
            var params = {};
      
            if (clientid) params = { ...params, ClientId: clientid };
            if (workerid) params = { ...params, WorkerId: workerid };
      
            notes = await Note.findAndCountAll({
              limit,
              offset,
              attributes: {
                ...findNoteAttributes,
              },
              where:{...params}
            });
    
            res.json(notes);
          } catch (error) {
            return next(ApiError.badRequest(error.message));
          }
    }

    async create(req,res, next){
        try {
            const {content, workerid, clientid} = req.body

            if(!content || !workerid || !clientid) return next(ApiError.badRequest('Указаны не все параметры'))

            const worker = await Worker.findOne({
                where:{id:workerid}
            })
            if (!worker) return next(ApiError.badRequest('Работник не найден'))

            const client = await Client.findOne({
                where:{id:clientid}
            })
            if (!client) return next(ApiError.badRequest('Клиент не найден'))

            const note = await Note.create({content, WorkerId: workerid, ClientId: clientid})

            res.json(note)
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
        
    }
}

module.exports = new NotesController()