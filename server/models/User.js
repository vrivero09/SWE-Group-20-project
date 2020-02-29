const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*  -Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
    -Subdocuments are documents embedded in other documents. 
        In Mongoose, this means you can nest schemas in other schemas.
        ShippingAddressSchema is an example of subdocument of UserSchema

    see https://mongoosejs.com/docs/subdocs.html for more info on subdocuments
*/

const ShippingAddressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    zip: String
});

const CreditCardSchema= new Schema({
    cardHolderName: String,
    cardNumber:Number,
    expirationMonth : Number,
    expirationYear : Number,
    securityCode : Number,
});

const ShoppingCartSchema = new Schema({

});

const WishlistSchema = new Schema({
    name: String,
    books: [{type: mongoose.ObjectId, ref: 'Book'}]
});

const UserSchema = new Schema({
    _id: String,
    firstName : {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        street: String,
        city: String,
        state: String,
        zip: String
    },
    shippingAddress: [ShippingAddressSchema],
    creditCards: [CreditCardSchema],
    wishLists:[WishlistSchema]
});

/*
   - When you call mongoose.model() on a schema, Mongoose compiles a model for you.
   - The first argument of mongoose.model is the singular name of the collection your model is for.
        - So if your collection is called users , then the argument should be User
*/
module.exports = User = mongoose.model('User', UserSchema);
