const input_box = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  if (input_box.value === "") {
    alert("Please enter a valid entry!");
  } else {
    let list = document.createElement("li");
    list.innerText = input_box.value;
    document.body.querySelector("ul").appendChild(list);
  }
  saveitems();
});
function saveitems(){
    localStorage.setItem('items',document.querySelector('ul').innerHTML)
}
