const URL = "https://newsapi.org/v2/everything?q=bitcoin&";
const API_KEY = "apiKey=2083f50f53194ccb9833e1fe3f3e9364";

const img=document.querySelectorAll('.card-img-top');
const text=document.querySelectorAll('.card-text');
const title=document.querySelectorAll('.card-title');
const link=document.querySelectorAll('.btn-primary');

async function get_news() {
  try {
    const response = await fetch(URL + API_KEY); //fetching data from the url
    const data = await response.json(); //converting the response to json format
    console.log(data.articles);
    for(let i=0;i<img.length;i++){
        img[i].src=data.articles[i].urlToImage; //adding image source in our html file
        text[i].innerHTML=data.articles[i].content; //adding news content in our html file
        title[i].innerHTML=data.articles[i].title; //adding news title in our html file
        link[i].href=data.articles[i].url;//link of the news article
    }
  } catch (error) {
    console.log(error);
  }
}

get_news(); // Call the function to fetch news
