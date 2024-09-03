const container = document.querySelector(".scoll_display");
const currency = container.querySelectorAll(".Exchange_rate");
const btc_prices = document.querySelector('.bitcoin').querySelectorAll('p');
const eth_prices = document.querySelector('.etherium').querySelectorAll('p');

async function getExchangePrice() {
    const options = {
        method: "GET",
        headers: { "x-cg-demo-api-key": "CG-NhdhrCZRnCSqdjMyf3XUu9k4" },
    };

    try {
        const [response1, response2] = await Promise.all([
            fetch("https://api.coingecko.com/api/v3/exchange_rates", options),
            fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd%2Ceur", options)
        ]);

        const [data1, data2] = await Promise.all([response1.json(), response2.json()]);

        const currencies = ['BTC', 'ETH', 'LTC', 'BCH', 'BNB', 'XLM', 'DOT', 'INR', 'JPY', 'BITS', 'GBP'];
        const currencySymbols = ['(BTC)','(ETH)', '(LTC)', '(BCH)', '(BNB)', '(XLM)', '(DOT)', '(₹)', '(¥)', '(μBTC)', '(£)'];

        for (let i = 0; i < currencies.length; i++) {
            const currencyCode = currencies[i].toLowerCase();
            const currencyValue = data1.rates[currencyCode].value;
            currency[i].innerHTML = `${currencySymbols[i]} ${currencyValue}`;
        }
        
        const moneyfacevalue=['EUR', 'USD'];
        for(let i=0;i<moneyfacevalue.length;i++){
            const money_face_value=moneyfacevalue[i].toLowerCase();
            btc_prices[i].innerHTML=`${data2.bitcoin[money_face_value]} ${moneyfacevalue[i]}`;
            eth_prices[i].innerHTML=`${data2.ethereum[money_face_value]} ${moneyfacevalue[i]}`;
        }

    } catch (error) {
        console.error(error);
    }
}

getExchangePrice();
