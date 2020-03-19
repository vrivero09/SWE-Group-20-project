const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const middleware = require('./middleware')
const data = require('./data');

const port = 5000;
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get('/api/products', (req, res) => {
  return res.json(data.products);
});

app.post('/api/products', (req, res) => {
  let products = [], id = null;
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products)
  for (var i = 0; i < data.products.length; i++) {
    id = data.products[i].id.toString();
    if (cart.hasOwnProperty(id)) {
      data.products[i].qty = cart[id]
      products.push(data.products[i]);
    }
  }
  return res.json(products);
});


app.get('/api/pay', middleware, (req, res) => { //checkout route for signed in users
  return res.json("Payment Successful!");
});

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

var CreditCards = require("./routes/CreditCards");
app.use("/creditCards", CreditCards);

app.listen(port, () => console.log("Server started on port " + port));
