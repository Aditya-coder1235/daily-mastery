import express from "express";
import { Login, Logout, Signup, GetUser } from "../controllers/auth.controller";
const authRouter = express.Router();

authRouter.post("/signup", Signup);
authRouter.post("/login", Login);
authRouter.post("/logout", Logout);
authRouter.get("/users", GetUser);

export default authRouter;