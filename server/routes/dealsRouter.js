const { Router } = require("express");
const dealsController = require("../controllers/dealsController");

const router = new Router()

router.post('/', dealsController.create)
router.get('/', dealsController.getAll)
router.get('/:id', dealsController.getOne)

module.exports = router