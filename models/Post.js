const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  desc: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  season: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  askPrice: {
    type: Number,
    required: false,
  },
  likes: {
    type: Number,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  purchaseDate: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    require: false,
  },
});


module.exports = mongoose.model("Post", PostSchema);


