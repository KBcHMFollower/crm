const { Router } = require("express");
const clientsController = require("../controllers/clientsController");

const router = new Router()

router.post('/', clientsController.create)
router.get('/', clientsController.getAll)
router.get('/:id', clientsController.getOne)

module.exports = router