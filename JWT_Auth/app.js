const express=require('express')
const app=express()
require('dotenv').config()
const mongoose=require('mongoose')
const router=require('./routes/userRoutes')

const port=process.env.PORT;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/jwt');
}
main().then(()=>console.log("Connected to DB"));

app.use(express.json())


app.get('/',(req,res)=>{
    res.send("Hi i am root!!")
})

app.use('/',router)

app.listen(port,()=>{
    console.log("server start at 8080 port");
})