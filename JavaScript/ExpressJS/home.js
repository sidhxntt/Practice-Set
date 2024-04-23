const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res ,next) => {
  res.send(`Hello`);
});

app.get('/:name', (req, res ,next) => {
    const {name}=req.params;
  res.send(`Hello ${name}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
