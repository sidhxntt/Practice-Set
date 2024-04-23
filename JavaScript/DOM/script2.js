console.log(document.body.style.background='seagreen');
const n= parseInt(prompt("Enter the times you want to print: "));
for(let i=0;i<n;i++){
    let div=document.createElement('div');  //create a <div> element
    div.innerHTML="Hello World";         //set the text of the <div> element
    document.body.appendChild(div);     //add it to the body of our page (in the end)
}
for(let i=1; i< document.getElementsByTagName('div').length;i++){   //loop through all <div> elements in the document
    document.body.getElementsByTagName('div')[i].style.background='lightblue';
}
console.log(typeof document.getElementsByTagName('div'));