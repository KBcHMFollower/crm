const { Router } = require("express");
const rateTypesController = require("../controllers/rateTypesController");
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');
const { ADMIN } = require("../utils/rights-const");


const router = new Router()

router.post('/',checkRoleMiddleware(ADMIN), rateTypesController.create)
router.get('/', rateTypesController.getAll)

module.exports = router