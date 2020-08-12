//const e = require("express");

const socket=io();
const form  =document.getElementById('chat-form')
const send_btn=document.getElementsByClassName('btn')[1]
console.log(send_btn)
var chat_div=document.getElementsByClassName('chat-messages')[0]
// registering event for entry of new client
socket.on('entry',(msg)=>{
  console.log(msg)
})
// registering event to render message to every client in the room
socket.on('render',(text)=>{
  const data=document.getElementById('msg')
  data.value="";
  const p_tag=document.createElement("p")
  const node=document.createTextNode(text)
  p_tag.appendChild(node)
  //console.log(p_tag)
  chat_div.appendChild(p_tag);
})
// text typed in the message box
const text=form.nodeValue
console.log(`the text entered is ${text}`)

// handling the send btn click
form.addEventListener('submit',(e)=>{
  e.preventDefault()
  const text=e.target.elements.msg.value
  socket.emit('send',text)

})