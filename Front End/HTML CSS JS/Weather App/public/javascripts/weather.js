const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const API_KEY = "9d45261bda5cb03e32a634d21dfa1a14";

const search_bar = document.querySelector('.search_container').firstElementChild;
const search_img = document.querySelector('.search_container').lastElementChild;
const content_img = document.querySelector(".content").firstElementChild;

async function getweatherDetails(city) {
    const response = await fetch(`${API_URL}&q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    return {
        temperature: Math.round(data.main.temp),
        name: data.name,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        weather: data.weather[0].main
    };
}

search_img.addEventListener('click', async () => {
    const city = search_bar.value;
    if (search_bar.value === '' || !isNaN(search_bar.value)|| search_bar.value!=city){
        alert("Please enter a Valid city!");
    } else {
    const { temperature, name, humidity, wind_speed, weather } = await getweatherDetails(city);

    document.querySelector('h1').innerHTML = `${temperature}°C`;
    document.querySelector('h3').innerHTML = `${name}`;
    document.querySelector('.humidity_content').firstElementChild.innerHTML = `${humidity}%`;
    document.querySelector('.wind_content').firstElementChild.innerHTML = `${wind_speed} km/h`;

    switch (weather) {
        case 'Clear':
            content_img.src = '../images/clear.png';
            break;
        case 'Clouds':
            content_img.src = '../images/clouds.png.png';
            break;
        case 'Rain':
            content_img.src = '../images/rain.png';
            break;
        case 'Drizzle':
            content_img.src = '../images/drizzle.png';
            break;
        case 'Snow':
            content_img.src = '../images/snow.png';
            break;
        case 'Mist':
            content_img.src = '../images/mist.png';
            break;
    }
}
});