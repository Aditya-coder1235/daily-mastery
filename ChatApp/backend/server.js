const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DBConnection = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

DBConnection()
    .then(() => console.log("DB Connected!"))
    .catch((err) => console.log(err));

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

const userRouter = require("./routes/user.routes");
const conversationRoutes = require("./routes/conversation.routes");
const messageRoutes = require("./routes/message.routes");

app.get("/", (req, res) => {
    res.send("Hi I am Root");
});

app.use("/api/auth", userRouter);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

let onlineUsers = [];

io.on("connection", (socket) => {
    socket.on("add user", (userId) => {
        const alreadyExists = onlineUsers.find((u) => u.userId === userId);
        if (!alreadyExists) {
            onlineUsers.push({ userId, socketId: socket.id });
        }
        io.emit("getOnlineUsers", onlineUsers.map((u) => u.userId));
    });

    socket.on("send", ({ senderId, receiverId, text, conversationId }) => {
        console.log("send event:", { senderId, receiverId, text });
        console.log("online users:", onlineUsers);

        const receiver = onlineUsers.find((u) => u.userId === receiverId);
        console.log("receiver:", receiver);

        if (receiver) {
            io.to(receiver.socketId).emit("get", {
                senderId,
                text,
                conversationId,
            });
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers.map((u) => u.userId));
    });
});

server.listen(8080, () => {
    console.log("Server running on port 8080");
});