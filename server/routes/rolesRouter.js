const { Router } = require("express");
const rolesController = require("../controllers/rolesController");
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')


const router = new Router()

router.post('/', rolesController.create)
router.get('/', rolesController.getAll)
router.get('/:id', rolesController.getOne)

module.exports = router