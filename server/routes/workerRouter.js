const { Router } = require("express");
const workersController = require("../controllers/workersController");
const authMiddleware = require('../middlewares/authMiddleware')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

const router = new Router()

router.post('/', checkRoleMiddleware('ADMIN'), workersController.create)
router.post('/login', workersController.login)
router.get('/auth', authMiddleware, workersController.check)
router.get('/', workersController.getAll)
router.get('/:id', workersController.getOne)

module.exports = router