// Router_Middleware.js
const express = require('express');
const router = express.Router();

// Middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
};
router.use(timeLog);

router.get('/', (req, res) => {
  res.send('Welcome to the Pages');
});

router.get('/:page_number', (req, res) => {
  const { page_number } = req.params;
  if(isNaN(page_number)) return res.status(400).send("Invalid Page Number");
  res.send(`Page Number ${page_number}`);
});

module.exports = router;
