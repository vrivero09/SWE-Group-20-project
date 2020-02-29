const express = require('express');
const ObjectID = require('mongodb').ObjectID;
var cors = require('cors');
const users = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const maximumWishlistCount = 3;

//get user model
const User = require("../models/User");
const Book = require("../models/Book");
users.use(cors());

SECRET_KEY = "MySecret";

// endpoint to get wishlists from database
users.get('/', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
    User.findOne({
        _id: decoded._id
    })
    .populate('wishLists.books')
    .then(user => {
        let wishLists = user.wishLists;
        res.json({result: 0, wishlists: wishLists});
    });
});

// endpoint to remove wishlist book item from database
users.post('/removebook', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
    User.findOne(
        {
            _id: decoded._id
        }
    )
    .populate('wishLists.books')
    .then(user => {
        const book_id = req.body.book_id;
        const wishlist_id = req.body.wishlist_id;
        let wishList = user.wishLists.find(wishlist => wishlist._id.equals(ObjectID(wishlist_id)));
        let i_book = -1;
        let book_count = wishList.books.length;
        for (let i = 0; i < book_count; i++) {
            console.log(JSON.stringify(wishList.books[i]));
            if (wishList.books[i]._id.equals(book_id)) {
                i_book = i;
                break;
            }
        }
        if (i_book !== -1)
        {
            wishList.books.splice(i_book, 1);
            user.save();
        }
        res.json({result: 0, message: 'success', wishlists: user.wishLists});
    });
});

// endpoint to remove wishlist
users.post('/remove', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
    User.findOne(
        {
            _id: decoded._id
        }
    )
    .populate('wishLists.books')
    .then(user => {
        const wishlistCount = user.wishLists.length;
        let iRemove = -1;
        for (let i = 0; i < wishlistCount; i++) {
            if (user.wishLists[i]._id.equals(req.body.wishlist_id)) {
                iRemove = i;
            }
        }
        if (iRemove == 0) {
            res.json({result: 2, message: `Can't remove primary wishlist.`});
            return;
        }
        if (iRemove !== -1) {
            user.wishLists.splice(iRemove, 1);
            user.save();
        }
        res.json({result: 0, wishlists: user.wishLists});
    })
    .catch(err => {
        res.json({result: 1, message: JSON.stringify(err)});
    });
});

// endpoint to move one book from on wishlist to another
users.post('/movebook', (req, res) => {
    // assume every parameter is valid
    const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
    User.findOne(
        {
            _id: decoded._id
        }
    )
    .populate('wishLists.books')
    .then(user => {
        const book_id = req.body.book_id;
        const wishlist_id_from = req.body.wishlist_id_from;
        const wishlist_id_to = req.body.wishlist_id_to;

        let wishListFrom = user.wishLists.find(wishlist => wishlist._id.equals(ObjectID(wishlist_id_from)));
        let wishListTo = user.wishLists.find(wishlist => wishlist._id.equals(ObjectID(wishlist_id_to)));

        let i_book = 0;
        let book_count = wishListFrom.books.length;
        for (let i = 0; i < book_count; i++) {
            if (wishListFrom.books[i]._id.equals(book_id)) {
                i_Book = i;
                break;
            }
        }
        wishListFrom.books.splice(i_book, 1);
        wishListTo.books.push(ObjectID(book_id));
        user.save();
        Book.findOne({_id: ObjectID(book_id)})
        .then(
            book => {
                wishListTo.books.pop();
                wishListTo.books.push(book);
                res.json({result: 0, message: 'success', wishlists: user.wishLists});
            }
        )
    })
    .catch(err => {
        res.json({result: 1, message: err});
    })
});

//endpoint to add wishlist to database
users.post('/add', (req,res) => {
    const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
    User.findOne({
        _id: decoded._id
    })
    .populate('wishLists.books')
    .then(user => {
        const wishlistName = req.body.name;
        let wishLists = user.wishLists;
        const found = wishLists.find(wishList => wishList.name==wishlistName);
        console.log(found);
        if (found !== undefined) {
            // duplicate wishlist name
            res.json({result: 1});
        } else {
            if (wishLists.length >= maximumWishlistCount) {
                // maximum wishlist count reached
                res.json({result: 2, count: maximumWishlistCount});
            } else {
                wishLists.push({name: wishlistName, books: []});
                user.save();
                res.json({result: 0, wishlists: wishLists});
            }
        }
    })
    .catch(err => {
        res.json({result: 2});
    });
});

module.exports = users;