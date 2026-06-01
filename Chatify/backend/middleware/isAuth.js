const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ message: "Token not found" })
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded

        next()
        
    } catch (error) {
        res.status(400).json({ message: "Invalid token!" });
    }
}