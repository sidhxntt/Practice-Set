const express = require("express");
const fs = require("fs").promises; // Using promises API directly
const path = require("path");
const app = express();
const port = 3000;

const personFilePath = path.join(__dirname, "person.json");
const productFilePath = path.join(__dirname, "products.json");

const myLogger1 = (req, res, next) => {
  console.log('LOGGED ONTO PERSONS');
  next();
};

const myLogger2 = (req, res, next) => {
  console.log('LOGGED ONTO PRODUCTS');
  next();
};

app.use('/person', myLogger1);
app.use('/products', myLogger2);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define a common async function for handling file read
const readFileAsync = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
};

// Use the common async function for both routes
app.get("/person", async (req, res) => {
  try {
    const data = await readFileAsync(personFilePath);
    res.send(data);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
});

app.get("/products", async (req, res) => {
  try {
    const data = await readFileAsync(productFilePath);
    res.send(data);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
