document.body.style.backgroundColor='lightblue';
console.log(document.body.getElementsByClassName("container"));
let div = document.createElement('div');
div.innerHTML="<h6> WASSUP <h6";
document.body.getElementsByClassName("container")[0].before(div);
console.log(document.body.getElementsByClassName("container")); 