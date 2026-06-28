const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require("../models/user.model");


const signupUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json("All feilds are required!");
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        let hashPassword = await bcrypt.hash(password, 10);

        let newUser = new User({
            name,
            email,
            password: hashPassword
        });

        await newUser.save()

        res.status(201).json({ message: "User register successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" })
    }
}


const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json("All feilds are required!");
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        let isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        let token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        )

        res.cookie("token", token, {
            httpOnly: true
        });

        res.status(200).json({ message: "Login successfully" ,user});

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" })
    }
}


const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true
        });

        res.status(200).json({ message: "Logout successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" })
    }
}


const getAlluser = async (req, res) => {
    try {

        let allUsers = await User.find();

        res.status(200).json(allUsers)

    } catch (error) {
        res.status(500).json({ message: "Internal server error!" })
    }
}

module.exports = { signupUser, loginUser, logoutUser, getAlluser }