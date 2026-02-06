const express=require('express');
const app=express();
require('dotenv').config();
const port=process.env.PORT;
const mongoose=require('mongoose');
const cors=require('cors');
const cookieParser=require('cookie-parser')

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(express.json());
app.use(cookieParser())


async function main(){
    mongoose.connect(process.env.MONGO_URI);
}
main().then(()=>console.log('Connect to DB'));

const userRouter=require('./routes/userRoutes');
const productRouter=require('./routes/productRoutes');

app.get('/',(req,res)=>{
    res.send('Hi i am Root');
    
});

app.use('/api/auth',userRouter);
app.use('/api/product',productRouter);

app.listen(port,()=>{
    console.log('server start at 8080 port');
})