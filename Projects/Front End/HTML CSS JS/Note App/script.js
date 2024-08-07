const btn = document.body.querySelector("button");

btn.addEventListener("click", function () {
  let container = document.createElement("div");
  container.classList.add("note_container");
  document.body.appendChild(container);

  let para = document.createElement("p");
  para.contentEditable = true;
  para.textContent = "Add";
  container.appendChild(para);

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", function () {
    container.style.display = "none";
  });
  container.appendChild(deleteBtn);
  saveNotes();

});
