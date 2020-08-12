var form =document.getElementById('form_main')
var form_control=document.getElementsByClassName('form-control')[0]
console.log(form_control.nextElementSibling.options)
var  users=[]
form.addEventListener('submit',(e)=>{
  const user=form_control.childNodes[3].value
  const room=form_control.nextElementSibling.childNodes[3].value
  curr_data={user_name:user,room_name:room}

  response=fetch('/user_database',{method:'POST',headers: {
    'Content-Type': 'application/json'
  },body:JSON.stringify(curr_data)})
})

