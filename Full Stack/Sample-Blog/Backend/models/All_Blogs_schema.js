const mongoose = require("mongoose");
const moment = require("moment");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  likes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }],
  dislikes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }],
  createAt: {
    type: Date,
    required: true,
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

const AllBlogs = mongoose.model("All_Blogs", blogSchema);

module.exports = AllBlogs;
