const express = require("express");
var cors = require("cors");
const books = express.Router();

//get book model
const Book = require("../models/Book");
books.use(cors());

//endpont to add user to database
books.post("/addreview", (req, res) => {
  //must validate confirm password! TODO
  const reviewData = {
    reviewText: req.body.reviewText,
    starRating: req.body.starRating,
    showUsername: req.body.showUsername
  };

  const book_ID = req.body._id;
  Book.findOne({
    _id: book_ID
  }).then(book => {
    if (book == null) {
      console.log("BOOK IS NULL.");
    } else {
      book.allReviews.push(reviewData);
      book.save();
    }
  });

  //find user by id (username)
  User.findOne({
    _id: req.body.username
  })
    .then(user => {
      //new user
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          //make user password in db the hashed version
          userData.password = hash;
          //create user using userData from request
          User.create(userData)
            .then(user => {
              res.json({ status: user._id + " registered" });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        //user already exists
        res.json({ error: "User already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = books;
