const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  owner: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
