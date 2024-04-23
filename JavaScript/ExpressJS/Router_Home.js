// app.js
const express = require('express');
const app = express();
const pagesRouter = require("./Router_Middleware.js");
const port = 3000;

app.use('/pages', pagesRouter); // Using the Middleware to handle all requests

app.get('/', (req, res) => {
  res.send(`Hello World`);
});

app.get('/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hello ${name}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
