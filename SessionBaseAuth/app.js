const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const mongoose = require('mongoose')
const session = require('express-session')
const mongooseSession = require('connect-mongodb-session')(session)
const bcrypt = require('bcrypt')

app.use(express.json())

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
}
main().then(() => console.log("Connected to db"))
.catch((err)=>console.log(err))

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userShema)

const store = new mongooseSession({
    uri: process.env.MONGO_URL,
    collection: 'mysession',
    expires: 60 * 60
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

const auth=(req,res,next)=>{
    if(req.session.isAuth){
        next()
    }else{
        res.status(400).json("You not have Access of this page")
    }
}

app.get('/home', auth ,(req, res) => {
    res.send("hi i am root")
})

app.post('/signup', async (req, res) => {
    let { username, email, password } = req.body

    let user = await User.findOne({ email })
    if (user) {
        return res.status(404).json({ message: "user already exist" })
    }

    const hashPassword = await bcrypt.hash(password, 12)
    let newUser = new User({ username, email, password: hashPassword })

    await newUser.save()

    res.status(200).json({message:"User registred successfully"});
})

app.post('/login',async (req,res)=>{
    let {email,password}=req.body
    let user=await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    let matched=await bcrypt.compare(password,user.password)
    if(!matched){
        return res.status(400).json({message:"password incorrect"});
    }

    req.session.isAuth=true
    res.status(200).json({message:"User Login"});
})

app.listen(port, () => {
    console.log("server start at 8080 port")
})