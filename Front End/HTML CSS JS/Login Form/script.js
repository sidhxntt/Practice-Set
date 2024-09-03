let login_button=document.querySelector('button');
let password=document.querySelector('.input-field-2').firstElementChild;
let username=document.querySelector( '.input-field-1' ).firstElementChild; 

login_button.addEventListener("click",function(event){
    if(username.value==""||password.value==""){
        event.preventDefault();
       alert("Please enter your username and password.");    
    }else if(password.value.length>15){
        event.preventDefault();
        let message=document.createElement('p');
        message.innerText='Password should be less than 15 characters.';
        document.body.querySelector( '.footer-2' ).appendChild(message);

    }
})