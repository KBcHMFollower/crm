const { Router } = require("express");
const rolesController = require("../controllers/rolesController");
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')


const router = new Router()

router.post('/',checkRoleMiddleware('ADMIN'), rolesController.create)
router.get('/', rolesController.getAll)

module.exports = router