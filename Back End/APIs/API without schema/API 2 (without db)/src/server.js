const express = require('express');
const data = require('../src/data');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to Crypto World');
});

app.get('/exchanges', async (req, res) => {
    try {
        const exchangeData = await data();
        res.send(exchangeData);
    } catch (error) {
        console.error('Error fetching exchange data:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
// async function getdata(){
//     try {
//         const Data=await data()
//         console.log(Data)
//     } catch (error) {
//         console.log(error.message)
//     }
// }
// getdata()

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
