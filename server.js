const express= require('express')
const path=require('path')
const app=express()
const http =require('http')
const socketio=require('socket.io')
const format=require('./utils/util_func.js')

const server=http.createServer(app)
const io=socketio(server)
app.use(express.static(path.join(__dirname,'public')))


app.use(express.json())
const port= process.env.port  || 8080
var user_data=[]

app.post('/user_database',(req,res)=>{
    console.log("New request")
    let user_name=req.body.user_name
    let room_no=req.body.room_name
    let curr_user_data=[user_name,room_no];
    user_data.push(curr_user_data)

})



io.on('connect',(soc) =>{
    console.log(`new connection `)
   
    if(user_data.length!=0){
        let user_name=user_data[user_data.length-1][0];
        let room_no=user_data[user_data.length-1][1];
        console.log(`${user_name} has entered in ${room_no}`)
    soc.join(room_no,()=>{
        io.to(room_no).emit('entry',`${user_name} has enterd ${room_no}`)
    })
   io.emit('entry','Welcome')
   soc.on('disconnect',(soc)=>{
       io.emit('entry',"user has left the chat")
   }) 
   soc.on('send',(text)=>{
       io.to(room_no).emit('render',text)
   })   
}}
)
server.listen(port)
