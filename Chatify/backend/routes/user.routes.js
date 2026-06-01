const express=require("express");
const { SignupUser, LoginUser, LogoutUser, getAllUsers } = require("../controllers/user.controller");
const router=express.Router();

router.post("/signup",SignupUser);
router.post("/login",LoginUser);
router.post("/logout",LogoutUser);
router.get("/getAll",getAllUsers);

module.exports=router;