const express=require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app=express()
const port=process.env.PORT
const methodOverride=require('method-override')
const User = require('./models/user')

app.set("view engine","ejs");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'));

async function main(){
    mongoose.connect(process.env.MONGO_URL)
}

main().then(()=>console.log("Connect to DB"));

app.get('/',(req,res)=>{
    res.send("Hi i am root!!")
})

app.get('/createuser',(req,res)=>{
    res.render("create")
})

app.post('/create',async(req,res)=>{
    let {username,email,password}=req.body;
    const user=new User({username,email,password})
    await user.save()
    res.redirect('/createuser')
});

app.get('/createuser/users',async(req,res)=>{
    let users=await User.find({})
    res.render("index",{users})
})

app.get('/createuser/users/:id',async(req,res)=>{
    let {id}=req.params
    let user=await User.findById(id)
    res.render("view",{user})
});

app.get('/update/:id',async(req,res)=>{
    let { id } = req.params
    let user = await User.findById(id)
    res.render("update" ,{user})
})

app.put('/update/:id',async(req,res)=>{
    let {username,email,password}=req.body
    let { id } = req.params
    await User.findByIdAndUpdate(id,{username,email,password});
    res.redirect(`/createuser/users/${id}`)
})

app.delete('/delete/:id',async(req,res)=>{
    let { id } = req.params
    await User.findByIdAndDelete(id)
    res.redirect('/createuser/users')
})


app.listen(port,()=>{
    console.log("Server start at 8080 PORT");
})