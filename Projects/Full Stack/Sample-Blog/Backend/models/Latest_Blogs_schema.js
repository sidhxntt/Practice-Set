const mongoose = require("mongoose");
const moment = require("moment");

const blogSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true, 
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    createAt:{
        type: Date,
        required: true,
        default: moment().format("YYYY-MM-DD HH:mm:ss"),
    }
});

const LatestBlogs = mongoose.model("Latest_Blogs", blogSchema);

module.exports = LatestBlogs;
