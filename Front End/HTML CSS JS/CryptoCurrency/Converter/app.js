async function populate_data(value, currency ,currency_to_change) {
  myStr = "";
  const API_KEY = "cur_live_zUPUAfvvFPoBylEmQ2O9djtcALLQ0mApOigwhFbq";
  const URL = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${currency}`;
  const response = await fetch(URL); //fetching data from the API
  const exchange_data = await response.json(); //converting it to JSON format

  document.querySelector(".output").style.display = "block";

  const key = currency_to_change; 
    myStr += ` <tr>
        <td>${exchange_data.data[key].code}</td>
        <td>${Math.round(exchange_data.data[key].value * value)}</td>
    </tr> 
`;

  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = myStr;
}

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = parseInt(
    document.querySelector("input[name='quantity']").value
  );
  const currency = document.querySelector("select[name='currency']").value;
  const currency_to_change= document.querySelector("select[name='currency_exchanger']").value;
  populate_data(inputValue, currency, currency_to_change);
});

