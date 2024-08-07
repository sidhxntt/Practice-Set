let num = 0;
const add_btn = document.querySelector('#add');
const remove_btn = document.querySelector('#sub');
const value = document.querySelector('p');

function updateValue() {
    if (num > 0) {
        value.innerHTML = num;
    } else {
        value.innerHTML = "INVALID";
    }
}

add_btn.addEventListener("click", () => {
    num += 1;
    updateValue();
});

remove_btn.addEventListener("click", () => {
    num -= 1;
    updateValue();
});

// Initial update
updateValue();
