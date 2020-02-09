const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShippingAddressSchema = new Schema({
    address:{
        street: String,
        city: String,
        state: String,
        zip: String
    },
});

const CreditCardSchema= new Schema({
    card:{
        cardHolderName: String,
        cardNumber:Number,
        expirationMonth : Number,
        expirationYear : Number,
        securityCode : Number,
    }
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
});


module.exports = User = mongoose.model('User', UserSchema);
