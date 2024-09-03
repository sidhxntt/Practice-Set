function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function Filtering() {
  const btn = document
    .querySelector(".container")
    .nextElementSibling.querySelectorAll("li");
  const images = document.querySelectorAll(".flip-card");

  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", (event) => {
      const numberOfImagesToShow = (i + 1) * 10; // Determine the number of images to show based on the button index
      for (let j = 0; j < images.length; j++) {
        images[j].style.display = j < numberOfImagesToShow ? "block" : "none";
      }
    });
  }
}

Filtering();
