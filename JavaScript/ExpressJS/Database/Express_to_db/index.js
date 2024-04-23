import express from 'express';
import mongoose from 'mongoose';
import expressTesting from './models/schema.mjs';

const app = express();
const port = 3000;

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/express_testing');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToDatabase();

app.get('/', async (req, res) => {
  try {
    const document = new expressTesting({ name: "John Doe", age: 22, relationship_status: true, sex: 'Male' });
    await document.save();
    console.log("Data saved in DB");
    res.send(`Hello`);
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/data', async (req, res) => {
  try {
    const jsonData = await expressTesting.find({});
    res.send(jsonData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
