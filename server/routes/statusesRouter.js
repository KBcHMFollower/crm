const { Router } = require("express");
const statusesController = require("../controllers/statusesController");
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');
const { ADMIN } = require("../utils/rights-const");

const router = new Router()

router.post('/', checkRoleMiddleware(ADMIN), statusesController.create)
router.get('/', statusesController.getAll)

module.exports = router