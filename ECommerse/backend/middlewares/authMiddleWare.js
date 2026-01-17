const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.authMiddleWare = (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "token not available" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded

        next()

    } catch (error) {
        res.status(400).json({ message: 'token not available' });
    }
}