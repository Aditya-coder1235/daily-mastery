const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT;
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

async function main() {
    await mongoose.connect(process.env.MONGO_URI)
}
main().then(() => console.log("Connect to DB")).catch((err) => console.log(err))

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

const userRouter=require('./routes/userRoutes')
const productRouter=require('./routes/productRoutes')
const reviewRouter=require('./routes/reviewsRoutes')

app.get('/', (req, res) => {
    res.send('Hi i am Root');
});

app.use('/api/auth',userRouter)
app.use('/api/product',productRouter)
app.use('/api/review',reviewRouter)

app.listen(port, () => {
    console.log(`Server start at ${port} Port`);
})