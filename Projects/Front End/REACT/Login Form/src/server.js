import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import credentials_collection from "/Users/siddhantgupta/Desktop/SID/Local Projects/WEB2.0/Front End/REACT/Login Form/src/models/schema.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

const connect_to_database = async () => {
  try {
      await mongoose.connect('mongodb://localhost:27017/Front-to-Back');
      console.log("Connected to database");
  } catch (error) {
      console.error("Failed to connect to database:", error);
  }
}
connect_to_database();

app.post('/', async (req, res) => {
  const { username, password } = req.body;
  // Check if credentials already exist in the database
  const existingCredentials = await credentials_collection.findOne({ username, password });
  if (existingCredentials) {
    console.log('Credentials already exist');
  }

  // If credentials don't exist, add them to the database
  try {
    await credentials_collection.create({ username, password });
    console.log('Credentials added successfully');
  } catch (error) {
    console.error("Failed to add credentials to the database:", error);
  }
});

app.get('/id', async (req, res) => {
  try {
    const credentials = await credentials_collection.find();
    res.send(credentials);
  } catch (error) {
    console.error("Failed to fetch credentials from the database:", error);
    res.status(500).send('Failed to fetch credentials');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
