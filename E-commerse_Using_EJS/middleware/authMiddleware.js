const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.locals.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = decoded;
        next();
    } catch (err) {
        res.locals.user = null;
        next();
    }
};

const isLoggedIn = (req, res, next) => {
    if (!res.locals.user) {
        return res.redirect('/login');
    }
    next();
};

module.exports = { authMiddleware, isLoggedIn };
