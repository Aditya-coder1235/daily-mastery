const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const converRoutes=require("./routes/conversation.routes");
const msgRoutes=require("./routes/message.routes");
const http=require('http');
const {Server}=require('socket.io')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({ message: "MERN authentication API is running." });
});

app.use("/api", authRoutes);
app.use("/api/conversation", converRoutes);
app.use("/api/message", msgRoutes);

let onlineUsers=[]

const server=http.createServer(app);

const io=new Server(server,{
  cors:{
    origin: CLIENT_URL,
    credentials: true,
  }
})

io.on("connection",(socket)=>{
  console.log("User connected",socket.id);

  socket.on("add user",(data)=>{
    let existingUser=onlineUsers.find((user)=>
      user.id===data.userId
    )

    if(existingUser){
      existingUser.socketId=socket.id
    }else{
      onlineUsers.push({
        id:data.userId,
        socketId:socket.id
      })
    }
  })

  socket.on("send",(data)=>{
    let user=onlineUsers.find((user)=>
      user.id === data.reciverId
    )

    if(user){
      io.to(user.socketId).emit("get msg", {
        senderId: data.userId,
        text: data.text
      })
    }
  })
})


connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
