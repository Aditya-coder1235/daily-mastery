const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
    let token = req.cookies.token;

    if (!token) {
        return res.status(400).json({ message: "invalid token" });
    }

    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;

        next()

    } catch (error) {
        res.status(400).json({ message: "invalid token!" });
    }
}