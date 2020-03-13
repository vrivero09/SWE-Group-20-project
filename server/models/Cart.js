const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    book: [{type: mongoose._id, ref: 'book'}],
}, {_id: false});
mongoose.model('ProductSchema', ProductSchema);

const OrderSchema = new Schema({
    _id: String,
    items: [ProductSchema],
    shipping: [AddressSchema],
    billing: [BillingSchema],
    status:{type: String, default: "Pending"},
    timestamp: {type: Date, default: Date.now}
});
mongoose.model('Order', OrderSchema);

const AddressSchema = new Schema({
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String
}, {_id: false});
mongoose.model('Address', AddressSchema);

const BillingSchema = new Schema({
    cardtype: {type: String, enum:['Visa', 'MasterCard','Amex']},
    name: String,
    number: String,
    expiremonth: Number,
    expireyear: Number,
    address: [AddressSchema]
}, {_id: false});
mongoose.model('Billing', BillingSchema);

const CustomerSchema = new Schema ({
    _id: {type: String, unique: true, required: true},
    shipping: [AddressSchema],
    billing: [BillingSchema],
    cart: [ProductSchema]
});
mongoose.model('Customer', CustomerSchema);
