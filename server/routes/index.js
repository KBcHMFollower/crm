const { Router } = require("express");
const workersRouter = require('./workerRouter')
const clientsRouter = require('./clientsRouter')
const dealsRouter = require('./dealsRouter')
const directionsRouter = require('./directionsRouter')
const notesRouter = require('./notesRouter')
const rateTypesRouter = require('./rateTypesRouter')
const rolesRouter = require('./rolesRouter')
const statusesRouter = require('./statusesRouter')
const rightsRouter = require('./rightsRouter')
const initialRoute = require('./initialRoute')

const router = new Router()

router.use('/workers',  workersRouter)
router.use('/clients', clientsRouter)
router.use('/deals', dealsRouter)
router.use('/directions', directionsRouter)
router.use('/notes', notesRouter)
router.use('/ratetypes', rateTypesRouter)
router.use('/roles', rolesRouter)
router.use('/statuses', statusesRouter)
router.use('/rights', rightsRouter)
router.use('/initial', initialRoute)

module.exports = router