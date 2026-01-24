import express from 'express'
import {createServer} from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'

const app=express()
const server=createServer(app)
const io=new Server(server,{
    cors:{
        origin: '*'
    }
})

app.get('/',(req,res)=>{
    res.send("Hi i am Root")
})

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);

    socket.on('joinRoom', async (userName)=>{
        console.log(userName)

        await socket.join('group')

        // io.to('group').emit('roomNotice',userName)

        socket.to('group').emit('roomNotice', userName)
    });


    socket.on('chatMessage',(message)=>{
        socket.to('group').emit('chatMessage', message)
    })
});

server.listen(8080,()=>{
    console.log('server start at 8080 port')
})