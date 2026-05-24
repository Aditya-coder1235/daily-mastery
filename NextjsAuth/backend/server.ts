import express, { Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectDB } from "./config/db";
import authRouter from "./routes/auth.route";
import conversationRouter from "./routes/conversation.routes";
import messageRouter from "./routes/message.routes";

ConnectDB()
    .then(() => console.log("Connect to DB"))
    .catch((err) => console.log(err));

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("hi i am root!");
});

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});
