const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser')

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');

// Database connection
const connect_to_database = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
    // Start the server after a successful database connection
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
};

connect_to_database();

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes); // Mount the auth routes

//cookies
app.get('/set-cookies', (req, res) => {
  res.cookie('name', 'John Doe', { maxAge: 1000 * 60 * 60 * 24 ,httpOnly: true});
  res.send('Cookie Visualisation')
})
app.get('/get-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies)
  res.send(cookies)
})