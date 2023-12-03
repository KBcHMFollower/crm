const { Router } = require("express");
const rolesController = require("../controllers/rolesController");
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');
const { ADMIN } = require("../utils/rights-const");


const router = new Router()

router.post('/',checkRoleMiddleware(ADMIN), rolesController.create)
router.get('/', rolesController.getAll)
router.get('/:id', rolesController.getOne)
router.delete('/:id',checkRoleMiddleware(ADMIN), rolesController.delete)

module.exports = router