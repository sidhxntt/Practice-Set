const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, "../../Frontend/images/profiles");
const placeholderPath = path.join(uploadsDir, "placeholder.jpeg");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
} else {
  // Ensure placeholder.jpeg exists and if not, create it
  if (!fs.existsSync(placeholderPath)) {
    // Create placeholder.jpeg if it doesn't exist
    fs.writeFileSync(placeholderPath, "");
  }
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Include user ID in the filename
    const userId = req.user.id; // Assuming user ID is available in req.user.id
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, userId + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload_profile_pic = multer({
  storage: storage,
}).single("DisplayPic");

module.exports = { upload_profile_pic };
