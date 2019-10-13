const controllerHandler = require("../controllers");

const {
  getUser,
  getAllUsers,
  addUser,
  loginUser
} = require("../controllers/User");
const express = require("express");
console.log("Kiran CONTROL HANDLER", controllerHandler);
console.log("Kiran CONTROL HANDLER1", getUser);

const router = express.Router();
router.get(
  "/:username",
  controllerHandler(getUser, (req, res, next) => [req.params.username])
);
router.get("/", controllerHandler(getAllUsers, (req, res, next) => []));
router.post("/add", controllerHandler(addUser, (req, res, next) => [req.body]));
router.post(
  "/login",
  controllerHandler(loginUser, (req, res, next) => [req.body])
);
module.exports = router;
