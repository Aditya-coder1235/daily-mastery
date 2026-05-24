import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function Signup(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 13);
        await User.create({
            name,
            email,
            password: hashPassword,
        });

        res.status(201).json({ message: "User register successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function Login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(404).json({ message: "Invalid Password!" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "2d" },
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });

        res.status(200).json({ message: "User login successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function Logout(req: Request, res: Response) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });

        res.status(200).json({ message: "User logout successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function GetUser(req: Request, res: Response) {
    try {
        const users = await User.find();

        res.status(200).json({
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
}