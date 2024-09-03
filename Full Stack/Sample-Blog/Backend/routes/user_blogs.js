const express = require("express");
const router = express.Router();
const user_blog = require("../models/User_blogs_schema");
const decryptJWT = require("../middlewares/Decryption");
const upload_blog_pic = require("../middlewares/BlogPicSaver")


router.post("/", decryptJWT, upload_blog_pic.single('BlogPic'), async (req, res, next) => {
  try {
    const { title, content, date, author } = req.body;
    const image = req.file ? req.file.filename : null;

    const blog = new user_blog({
      userId: req.user.id,
      title,
      author,
      date,
      content,
      image,
    });

    await blog.save();

    res.status(201).json({message: "Blog post created successfully"});
  } catch (error) {
    next(error);
  }
});

// GET request to fetch all blog posts associated with the user
router.get("/", decryptJWT, async (req, res, next) => {
  try {
    const userBlogs = await user_blog.find({ userId: req.user.id });
    res.status(200).send(userBlogs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
