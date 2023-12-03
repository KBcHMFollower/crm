const { Router } = require("express");
const rightsController = require("../controllers/rightsController");

const router = new Router()

router.post('/', rightsController.create)
router.get('/', rightsController.getAll)
router.post('/roles', rightsController.addRoleRight)
router.delete('/roles', rightsController.deleteRoleRight)

module.exports = router