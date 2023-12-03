const { Router } = require("express");
const clientsController = require("../controllers/clientsController");
const checkRoleMiddleware = require("../middlewares/checkRoleMiddleware");
const { CREATE_CLIENT, UPDATE_CLIENT } = require("../utils/rights-const");

const router = new Router()

router.post('/',checkRoleMiddleware(CREATE_CLIENT), clientsController.create)
router.get('/', clientsController.getAll)
router.get('/:id', clientsController.getOne)
router.put('/:id',checkRoleMiddleware(UPDATE_CLIENT), clientsController.update)
// router.delete('/:id', clientsController.delete)

module.exports = router