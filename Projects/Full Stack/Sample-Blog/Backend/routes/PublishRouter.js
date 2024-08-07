const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const user_blog = require("../models/User_blogs_schema");
const All_Blogs = require("../models/All_Blogs_schema");
const decryptJWT = require("../middlewares/Decryption");

router.post("/:id", decryptJWT, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userBlog = await user_blog.findOne({ userId: req.user.id, _id: id });

    const originalImagePath = path.join(__dirname, '../../Frontend/images/user_uploads', userBlog.image);
    const newImagePath = path.join(__dirname, '../../Frontend/images/all-blogs', userBlog.image);
    fs.copyFileSync(originalImagePath, newImagePath);

    const NewBlog = new All_Blogs({
      title: userBlog.title,
      description: userBlog.content,
      body: userBlog.content,
      author: userBlog.author,
      date: userBlog.date,
      image: userBlog.image, 
    });

    await NewBlog.save();
    res.status(200).json({message: "Blog saved successfully"});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
