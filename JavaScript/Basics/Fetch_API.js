const toggleButton = document.querySelector('.toggle-btn');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
});

const URL = 'https://cat-fact.herokuapp.com/facts/';
const button = document.querySelector('button');

(async () => {
    console.log("Fetching cat facts...");
    let response = await fetch(URL, { method: 'GET' });
    let data = await response.json();
    console.log(data[0].text);
    console.log(data[1].text);
    console.log(data[2].text);

    function displayContent() {
        document.querySelector('p').innerHTML = data[0].text;
    }

    displayContent(); // Call the function to display content
})(); //IIFE
