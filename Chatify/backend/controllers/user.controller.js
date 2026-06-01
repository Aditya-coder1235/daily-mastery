const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.SignupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashPassword = await bcrypt.hash(password, 13);

        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        await newUser.save()

        res.status(201).json({ message: "user register successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.LoginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(200).json({ message: "User login successfully!",user });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.LogoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(200).json({ message: "User logout successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getAllUsers=async (req,res)=>{
    try {
        const allUsers=await User.find()

        res.status(200).json(allUsers);

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}