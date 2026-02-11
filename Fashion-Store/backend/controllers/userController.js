const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.signupUser = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already Exists!" });
        }

        let hashPassword = await bcrypt.hash(password, 13)

        const newUser = new User({ name, email, password: hashPassword, role })

        await newUser.save()

        res.status(200).json({ message: "User signup successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}


exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User Not found" });
        }

        let isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(404).json({ message: "Invalid Credentials try again!" });
        }

        let token = jwt.sign(
            { id: user._id, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        res.cookie('token', token,
            {
                httpOnly: true,
                sameSite: 'lax',
                secure: false
            }
        );

        res.status(200).json({ message: "User login Successfully!" ,user});


    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}


exports.logoutUser = async (req, res) => {
    try {

        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        });

        res.status(200).json({ message: "User Logout Successfully!" });


    } catch (error) {
        res.status(500).json({ message: "Internal server Error" })
    }
}

