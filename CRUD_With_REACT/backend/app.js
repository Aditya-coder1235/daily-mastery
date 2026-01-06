const express=require('express')
const app=express()
require('dotenv').config()
const port=process.env.PORT || 8080
const mongoose=require('mongoose');
const userRouter=require('./Routes/user.routes')
const cors=require('cors')

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json())

async function main(){
    await mongoose.connect(process.env.MONGO_URI)
}

main().then(()=>console.log("Connect to DB"));

app.get('/',(req,res)=>{
    res.send("Hi i am Root");
})

app.use('/user',userRouter);


app.listen(port,()=>{
    console.log("Server start at 8080 port");
})