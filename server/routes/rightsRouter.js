const { Router } = require("express");
const rightsController = require("../controllers/rightsController");
const { ADMIN } = require("../utils/rights-const");
const checkRoleMiddleware = require("../middlewares/checkRoleMiddleware");

const router = new Router()

router.post('/',checkRoleMiddleware(ADMIN), rightsController.create)
router.get('/', rightsController.getAll)
router.post('/roles',checkRoleMiddleware(ADMIN), rightsController.addRoleRight)
router.delete('/roles',checkRoleMiddleware(ADMIN), rightsController.deleteRoleRight)

module.exports = router