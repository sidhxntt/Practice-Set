const express = require('express');
const app = express();
const port = 3000;

app.get('/flights/:from/:to', (req, res ,next) => {
  const { from, to } = req.params;
  // You can use the values of 'from' and 'to' to process your flight information.
  res.send(`Flight from ${from} to ${to}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
