function myfunction(){
    let res=document.body.querySelector(".res");
    let number=parseInt(prompt("Enter a number"));
    if(number%2==0){
        res.innerHTML="The given number is even";
    }
    else{
        res.innerHTML="The given number is odd";
    }
    
}
