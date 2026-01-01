const express=require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')
const aiRouter=require('./routes/aiRouter')

const port=process.env.PORT
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("This is Ai ChatBot Root!");
})

app.use('/ai',aiRouter)

app.listen(port,()=>{
    console.log("Server start at 8080 port!");
})