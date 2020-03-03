const mongoose = require('mongoose'),
    Customer = mongoose.model('Customer'),
    Address = mongoose.model('Address'),
    Billing = mongoose.model('Billing');
exports.getCustomer = function(req,res){
    Customer.findOne({userid: 'customerA'}).
    exec(function(err, customer){
        if(!customer){
            res.json(404, {msg: 'Customer not found'});
        } else{
            res.json(customer);
        }
    });
};

exports.updateShipping = function(req, res){
    const newShipping = new Address(req.body.updateShipping);
    Customer.update({userid: 'customerA'},
    {$set: {shipping:[newShipping.toObject()]}}).
    exec(function(err, results){
        if (err || results < 1){
            res.json(404, {msg: 'Failed to update shipping.'});
        } else{
            res.json({msg: 'Customer shipping updated.'})
        }
    });
};

exports.updateCart = function(req, res){
    Customer.update({userid: 'customerA'},
    {$set: {cart:req.body.updateCart}}).
    exec(function(err, results){
        if (err || results < 1){
            res.json(404, {msg: 'Failed to update Cart.'});
        } else{
            res.json({msg: 'Customer Cart updated.'})
        }
    });
};


