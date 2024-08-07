const express = require('express');
const Latest_Blogs = require('../models/Latest_Blogs_schema');

const router = express.Router();

// Route to fetch all Latest blogs
router.get('/', async (req, res, next) => {
  try {
    const blogs = await Latest_Blogs.find();
    res.send(blogs);
  } catch (error) {
    next(error)
  }
});

// Route to fetch a Latest blog by ID
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).send('Invalid blog ID');
  }

  try {
    const blog = await Latest_Blogs.findOne({ id: Number(id) });
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.send(blog);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
