const mongoose = require("mongoose");

const UserblogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
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
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserblogSchema.post("save", function () {
  console.log("User Blog created successfully");
});
const user_blog = mongoose.model("user_blog", UserblogSchema);
module.exports = user_blog;
