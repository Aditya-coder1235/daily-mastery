const Groq=require('groq-sdk')
require('dotenv').config()

const groq=new Groq({
    apiKey: process.env.GROQ_API_KEY
})

module.exports=groq