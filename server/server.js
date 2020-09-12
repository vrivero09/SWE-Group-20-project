const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');

const middleware = require('./middleware');
const ObjectID = require('mongodb').ObjectID;
const Book = require("./models/Book");

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get('/api/products', async (req, res) => {
  return res.json(await Book.find());
});

app.get('/api/book', async (req, res) => {
  const bookId = req.query.id;
  return res.json(await Book.findOne({_id: ObjectID(bookId)}));
});


app.post('/api/products', async (req, res) => {
  let products = [], id = null;
  console.log(req.body.cart);
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products);
  let books = await Book.find();
  for (let i = 0; i < books.length; i++) {
    id = books[i].id.toString();
    if (cart.hasOwnProperty(id)) {
      products.push({
        quantity: cart[id],
        author: books[i].author,
        description: books[i].description,
        topSell: books[i].topSell,
        bookTitle: books[i].bookTitle,
        bookCoverAddress: books[i].bookCoverAddress,
        price: books[i].price,
        averageRating: books[i].averageRating,
        _id: books[i]._id
      });
    }
  }
  return res.json(products);
});

app.get('/api/pay', middleware, (req, res) => { //checkout route for signed in users
  return res.json("Payment Successful!");
});


const mongoURI = 'mongodb+srv://admin:admin123@cluster0-ywzdx.mongodb.net/test?retryWrites=true&w=majority';
// const mongoURI = "mongodb://127.0.0.1:27017/test";

mongoose
  .connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .catch(err => console.log(err));

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database conncetion established successfully");
});

//these two lines means that your book routes that are defined in /routes/Books.js can be used
//by prepending /book to the route. For example localhost:5000/book/addreviews
var Books = require("./routes/Books");
app.use("/book", Books);

var Users = require("./routes/Users");
app.use("/users", Users);

var Wishlist = require("./routes/Wishlist");
app.use("/wishlist", Wishlist);


var cart = require("./routes/Cart");
app.use("/cart", cart);

var CreditCards = require("./routes/CreditCards");
app.use("/creditCards", CreditCards);

var ShippingAddresses = require('./routes/ShippingAddrs');
app.use("/shippingAddresses",ShippingAddresses);

//heroku
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  //app.use(express.static('client/build'));

  app.use('*', express.static(path.join(__dirname, "client", "build")))

  //Express serve up index.html file if it doesn't recognize route
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

app.listen(port, () => console.log("Server started on port " + port));
