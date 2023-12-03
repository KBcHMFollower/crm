const { Router } = require("express");
const workersController = require("../controllers/workersController");
const authMiddleware = require('../middlewares/authMiddleware')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');
const { CREATE_WORKER, WORKERS_SECTION, UPDATE_WORKER, DELETE_WORKER } = require("../utils/rights-const");

const router = new Router()

router.post('/', checkRoleMiddleware(CREATE_WORKER), workersController.create)
router.post('/login', workersController.login)
router.get('/auth', authMiddleware, workersController.check)
router.get('/', workersController.getAll)
router.get('/:id', workersController.getOne)
router.put('/:id',checkRoleMiddleware(UPDATE_WORKER), workersController.update)
router.delete('/:id',checkRoleMiddleware(DELETE_WORKER), workersController.delete)

module.exports = router