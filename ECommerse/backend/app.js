const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT;
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser=require('cookie-parser')

async function main() {
    await mongoose.connect(process.env.MONGO_URI)
}

main().then(() => console.log('Connnect to db'))
    .catch((err) => console.log(err));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static("uploads"));

const authRouter=require('./routes/auth.Routes')
const productRouter=require('./routes/product.routes');
const reviewRouter=require('./routes/review.Routes')

app.use('/api/user',authRouter)
app.use('/api/product',productRouter);
app.use('/api/review', reviewRouter);


app.get('/', (req, res) => {
    res.send("Hi i am root");
})

app.listen(port, () => {
    console.log("Server start at 8080 port");
})