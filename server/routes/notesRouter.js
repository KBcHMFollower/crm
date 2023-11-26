const { Router } = require("express");
const notesController = require("../controllers/notesController");

const router = new Router()

router.post('/', notesController.create)
router.get('/', notesController.getAll)
router.get('/:id', notesController.getOne)

module.exports = router