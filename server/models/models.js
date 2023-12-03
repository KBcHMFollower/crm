const sequelize = require('../db')
const {DataTypes} = require('sequelize')


//WorkersSection
const Worker = sequelize.define('Workers', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    fname:{type:DataTypes.STRING},
    lname:{type:DataTypes.STRING},
    login:{type:DataTypes.STRING, unique:true},
    pass:{type:DataTypes.STRING},
    phone:{type:DataTypes.STRING, unique:true},
    email:{type:DataTypes.STRING, unique:true},
    birthday:{type:DataTypes.DATE}
})

const RateType = sequelize.define('RateTypes', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true},
})

const Role = sequelize.define('Roles', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true},
})

const Right = sequelize.define('Rights', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true},
})

const RolesAndRight = sequelize.define('RolesAndRights', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
})

const WorkerRate = sequelize.define('WorkersRate', {
    rate:{type:DataTypes.INTEGER},
})

//ClientsSection
const Client = sequelize.define('Clients', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    lessons_count:{type:DataTypes.INTEGER},
    fname:{type:DataTypes.STRING},
    lname:{type:DataTypes.STRING},
    phone:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING},
    birthday:{type:DataTypes.DATE}
})

const Deal = sequelize.define('Deals', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    deal_summ:{type:DataTypes.INTEGER},
    deal_lessonsbuy:{type:DataTypes.INTEGER},
})

const Status = sequelize.define('Statuses', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true}
})

const Direction = sequelize.define('Directions', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true}
})

//Notes

const Note = sequelize.define('Notes', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    content:{type:DataTypes.STRING}
})

//entity relationships

//Worker
RateType.hasMany(WorkerRate)
WorkerRate.belongsTo(RateType)

Worker.hasOne(WorkerRate)
WorkerRate.belongsTo(Worker)

Role.hasMany(Worker)
Worker.belongsTo(Role)

Role.belongsToMany(Right, {through: RolesAndRight})
Right.belongsToMany(Role, {through: RolesAndRight})

//Note
Worker.hasMany(Note)
Note.belongsTo(Worker)

Client.hasMany(Note)
Note.belongsTo(Client)

//Client
Client.hasMany(Deal)
Deal.belongsTo(Client)

Status.hasMany(Client)
Client.belongsTo(Status)

Direction.hasMany(Client)
Client.belongsTo(Direction)

module.exports = {
    Worker,
    RateType,
    Role,
    WorkerRate,
    Client,
    Status,
    Direction,
    Note,
    Deal,
    Right,
    RolesAndRight
}