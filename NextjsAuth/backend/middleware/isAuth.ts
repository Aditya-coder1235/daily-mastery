import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            email: string;
        };

        (req as any).user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token",
        });
    }
};

export default isAuth;
