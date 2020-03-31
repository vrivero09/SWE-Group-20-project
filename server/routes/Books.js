const express = require("express");
var cors = require("cors");
const books = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

/*
  see https://mongoosejs.com/docs/models.html for querying, deleting, and updating documents
*/

//get book model
const Book = require("../models/Book");
books.use(cors());

SECRET_KEY = "MySecret";

// endpoint to get reviews from database (not working)
//const book_ID = "5e559a1c1c9d440000350f9c";

books.get("/getReviews", (req, res) => {
  console.log("TESTING");

  const decoded = jwt.verify(req.headers["authorization"], SECRET_KEY);
  const book_ID = decoded._id;
  console.log("BOOK ID 2: " + book_ID);

  Book.findOne({
    _id: book_ID
  })
    //    .populate("Book.allReviews")
    .then(currentBookGetReview => {
      let allReviewsForBook = currentBookGetReview.allReviews;
      res.json({ result: 0, reviews: allReviewsForBook });
    });
});

//endpoint to add review to database
books.post("/addreview", (req, res) => {
  console.log("TESTING PRINT STATEMENT");

  //store information from request body that will be used to create a new review
  const reviewData = {
    reviewText: req.body.reviewText,
    starRating: req.body.starRating,
    showUsername: req.body.showUsername
  };

  //store book id that was given in request body, need to cast the string into ObjectId
  const book_ID = new mongoose.Types.ObjectId(req.body._id);
  console.log("TESTING PRINT STATEMENT");
  //use a model method to query the database, find the book with the given id
  Book.findOne({
    _id: book_ID
  }).then(book => {
    //.then is a callback function that lets you do something with the result of the query
    //in this case, the result is stored in book variable

    if (book == null) {
      console.log("IS BOOK NULL?");
      res.send("Book is null");
    } else {
      console.log("BOOK IS NOT NULL.");
      //if found a book with given id, push the new review to the allReviews array inside the book document
      book.allReviews.push(reviewData);
      //save and update in the database
      book.save();

      res.send("Review saved");
    }
  });
});

books.post("/products", (req, res) => {
  //store book id that was given in request body, need to cast the string into ObjectId
  const book_ID = new mongoose.Types.ObjectId(req.body._id);

  //use a model method to query the database, find the book with the given id
  Book.findOne({
    _id: book_ID
  }).then(book => {
    //.then is a callback function that lets you do something with the result of the query
    //in this case, the result is stored in book variable
    if (book == null) {
      res.send("Book is null");
    } else {
      res.send(book);
    }
  });
});

//must export your routes so you can use them in server.js
module.exports = books;
