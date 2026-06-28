const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/signup", userController.signupUser)
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser)
router.get("/getAllUsers", userController.getAlluser)


module.exports = router