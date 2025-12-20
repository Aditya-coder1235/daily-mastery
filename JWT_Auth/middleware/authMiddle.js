const jwt=require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token " });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
            error: err.message
        });
    }
};


module.exports=auth