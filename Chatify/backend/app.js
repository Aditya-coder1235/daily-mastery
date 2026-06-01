const express = require("express");
const DBConnect = require("./config/db");
const dotenv = require("dotenv");
dotenv.config()
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const http = require("http");


DBConnect().then(() => console.log("Connect to DB")).catch((err) => console.log(err));

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser())

const userRouter = require("./routes/user.routes");
const conversationRoutes = require("./routes/conversation.routes");
const messageRoutes = require("./routes/message.routes");

app.get("/", (req, res) => {
    res.send("Hi, I am Root!");
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

let onlineUsers=[]

io.on("connection",(socket)=>{
    console.log("User conneted",socket.id);

    socket.on("addUser",(userId)=>{
        if(!userId)return
        let existingUser =onlineUsers.find((u)=>u.id===userId)
        if (existingUser) {
            existingUser.socketId = socket.id
        } else {
            onlineUsers.push({
                id: userId,
                socketId: socket.id
            })
        }
    })

    socket.on("sendMessage", ({ senderId, receiverId, text, conversationId })=>{
        let user = onlineUsers.find((user) =>
            user.id === receiverId
        );

        if (user) {
            io.to(user.socketId).emit("getMessage", {
                sender: senderId,
                text,
                conversationId,
            });
        }
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) =>
            user.socketId !== socket.id
        )

        console.log("User disconnect");
    })
})


server.listen(port, () => {
    console.log("server start on 8080 port");
});