const express = require("express");
const router = express.Router();
const Users = require("../models/user_schema");
const decryptJWT = require("../middlewares/Decryption");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { upload_profile_pic } = require("../middlewares/ProfilePicSaver");

router.get("/", decryptJWT, async (req, res, next) => {
  try {
    const users = await Users.find({_id: req.user.id});
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});


router.put("/", decryptJWT,  upload_profile_pic, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { username, email, password } = req.body;

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    // Create an object to hold only the fields that are being updated
    let updateData = {};
    if (username && username !== user.username) {
      updateData.username = username;
    }
    if (email && email !== user.email) {
      updateData.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // If a new display picture is uploaded, handle the file
    if (req.file) {
      // Delete the old profile picture if it exists
      if (user.image) {
        const oldPicPath = path.join(__dirname, "../../Frontend/images/profiles", user.image);
        if (fs.existsSync(oldPicPath)) {
          fs.unlinkSync(oldPicPath);
        }
      }

      // Update the user document with the new picture's filename
      updateData.image = req.file.filename;
    }

    // Update the user's profile
    const updatedUser = await Users.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Delete only image
router.delete('/image',decryptJWT, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Get the path to the image
    const imagePath = path.join(__dirname, "../../Frontend/images/profiles", user.image);

    // Remove the image file if it exists
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Remove the image reference from the user document
    user.image = '';
    await user.save();

    res.send({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

//Delete User
router.delete('/',decryptJWT, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user by ID
    const user = await Users.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send({ message: 'User deleted successfully' });
    console.log("User deleted successfully")
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});


module.exports = router;
