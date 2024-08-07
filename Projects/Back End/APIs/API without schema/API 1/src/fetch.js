const fs = require('fs').promises; // Importing the fs module with promises

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/exchanges');
    const data = await response.json();
    // Write data to a file as JSON
    await fs.writeFile('exchanges.json', JSON.stringify(data));
    console.log('Data has been written to exchanges.json');
  } catch (error) {
    console.error(error.message);
  }
}

fetchData();

  