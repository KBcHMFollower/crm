const { Router } = require("express");
const notesController = require("../controllers/notesController");
const checkRoleMiddleware = require("../middlewares/checkRoleMiddleware");
const { CREATE_NOTE } = require("../utils/rights-const");

const router = new Router()

router.post('/',checkRoleMiddleware(CREATE_NOTE), notesController.create)
router.get('/', notesController.getAll)

module.exports = router