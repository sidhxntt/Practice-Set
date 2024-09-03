const express = require("express");
const All_Blogs = require("../models/All_Blogs_schema");
const decryptJWT = require("../middlewares/Decryption");

const router = express.Router();

// Route to fetch all Latest blogs
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    const blogs = await All_Blogs.find();

    results.total = limit * page;

    if (endIndex < blogs.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = blogs.slice(startIndex, endIndex);
    res.send(results);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Route to fetch a Latest blog by ID
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
 
  try {
    const blog = await All_Blogs.findOne({ _id: id });
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.send(blog);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Update like/dislike status
router.post('/:id', decryptJWT, async (req, res, next) => {
  const userID  = req.user.id;
  const  blogID  = req.params.id;
  const { action } = req.body;

  try {
    const blog = await All_Blogs.findOne({ _id: blogID });

    if (!blog) {
      return res.status(404).send('Blog post not found');
    }

    const { likes, dislikes } = blog;
    const alreadyLiked = likes.includes(userID);
    const alreadyDisliked = dislikes.includes(userID);

    if (action === 'like') {
      if (alreadyLiked) {
        blog.likes.pull(userID); // Unselect if already liked
      } else {
        blog.likes.push(userID); // Select like
        if (alreadyDisliked) {
          blog.dislikes.pull(userID); // Unselect dislike if already disliked
        }
      }
    } else if (action === 'dislike') {
      if (alreadyDisliked) {
        blog.dislikes.pull(userID); // Unselect if already disliked
      } else {
        blog.dislikes.push(userID); // Select dislike
        if (alreadyLiked) {
          blog.likes.pull(userID); // Unselect like if already liked
        }
      }
    }

    await blog.save();
    res.status(200).send({ status: action === 'like' ? true : false });

  } catch (error) {
    next(error);
  }
});

router.get('/:id/status', decryptJWT, async (req, res, next) => {
  const userID  = req.user.id;
  const  blogID  = req.params.id;

  try {
    const blog = await All_Blogs.findOne({ _id: blogID });

    if (!blog) {
      return res.status(404).send('Blog post not found');
    }

    const status = blog.likes.includes(userID)
      ? true
      : blog.dislikes.includes(userID)
      ? false
      : null;

    res.status(200).send({ status });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
