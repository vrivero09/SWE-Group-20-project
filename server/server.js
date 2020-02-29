const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = 5000;
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const mongoURI = 'mongodb+srv://admin:admin123@cluster0-ywzdx.mongodb.net/test?retryWrites=true&w=majority';
// const mongoURI = "mongodb://127.0.0.1:27017/test";

mongoose.connect(mongoURI, {useUnifiedTopology: true, useNewUrlParser: true})
    .catch(err => console.log(err));

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database conncetion established successfully");
});

//these two lines means that your book routes that are defined in /routes/Books.js can be used 
//by prepending /book to the route. For example localhost:5000/book/addreviews
var Books = require("./routes/Books");
app.use("/book", Books);

//import user route
var Users = require("./routes/Users");

//use the route
app.use("/users", Users);

var Wishlist = require("./routes/Wishlist");
app.use("/wishlist", Wishlist);

app.listen(port, () => console.log("Server started on port " + port));
