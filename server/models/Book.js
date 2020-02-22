const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  username: String,
  reviewText: String,
  starRating: Number,
  showUsername: Boolean
});

const BookSchema = new Schema({
  bookTitle: {
    type: String
  },

  price: {
    type: Number
  },

  author: {
    type: String
  },

  authorBio: {
    type: String
  },

  averageRating: {
    type: Number
  },

  description: {
    type: String
  },

  genre: {
    type: String
  },

  publisher: {
    type: String
  },

  bookCoverAddress: {
    type: String
  },

  _id: {
    type: String
  },

  allReviews: [ReviewSchema]
});

module.exports = Book = mongoose.model("books", BookSchema);
