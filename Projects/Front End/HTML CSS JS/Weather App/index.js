const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const publicPath = path.join(__dirname, 'public');

// Serve static files from the "public" directory
app.use(express.static(publicPath));


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
