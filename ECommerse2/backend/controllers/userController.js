const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config()


exports.signupUser = async (req, res) => {
    try {
        let { name, email, password,role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "user already exists" });
        }

        let hashPassword = await bcrypt.hash(password, 13)

        let newUser = new User({ name, email, password: hashPassword,role })

        await newUser.save()

        res.status(200).json({ message: "User registered successfully" });


    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        let isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        let token = jwt.sign(
            { id: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })

        res.status(200).json({ message: "User login successfully", user, token });


    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.logoutUser = async (req, res) => {
    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })

        res.status(200).json({ message: "User logout successfully"});


    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}