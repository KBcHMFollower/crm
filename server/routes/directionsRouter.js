const { Router } = require("express");
const directionsController = require("../controllers/directionsController");
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');
const { ADMIN } = require("../utils/rights-const");


const router = new Router()

router.post('/',checkRoleMiddleware(ADMIN), directionsController.create)
router.get('/', directionsController.getAll)

module.exports = router