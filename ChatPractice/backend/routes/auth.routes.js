const express = require("express");
const {
  signup,
  login,
  getUsers,
  logout,
} = require("../controllers/auth.controller");
const protectRoute = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.get("/user/all", getUsers);

module.exports = router;
