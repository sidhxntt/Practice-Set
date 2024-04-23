const button = document.querySelector("button");

button.addEventListener("click", () => {
  const name = prompt("What is your name?");
  const title = document.createElement("h1");
  title.innerHTML = `Hello ${name}`;
  document.body.appendChild(title);
});
