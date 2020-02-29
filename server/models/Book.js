const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*  -Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
    -Subdocuments are documents embedded in other documents. 
        In Mongoose, this means you can nest schemas in other schemas.
        ReviewSchema is an example of subdocument of BookSchema

    see https://mongoosejs.com/docs/subdocs.html for more info on subdocuments
*/

const ReviewSchema = new Schema({
  username: String,   // String is shorthand for {type: String}
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

  //this is not needed because when we create books on the database, it will auto generate ObjectId
  // _id: {
  //   type: String
  // },

  allReviews: [ReviewSchema]
});


/*
   - When you call mongoose.model() on a schema, Mongoose compiles a model for you.
   - The first argument of mongoose.model is the singular name of the collection your model is for.
        - So if your collection is called users , then the argument should be User
*/
module.exports = Book = mongoose.model("Book", BookSchema);
