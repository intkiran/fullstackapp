const express = require("express");
const router = express.Router();
const testController = require("../controllers/TestController");
router.get("/test", testController.test);
module.exports = router;
