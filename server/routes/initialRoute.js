const { Router } = require("express");
const initialController = require("../controllers/initialController");


const router = new Router()

router.get('/', initialController.initial)

module.exports = router