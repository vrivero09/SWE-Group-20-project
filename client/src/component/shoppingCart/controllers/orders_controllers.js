const mongoose = require('mongoose'),
    Customer = mongoose.model('Customer'),
    Order = mongoose.model('Order'),
    Address = mongoose.model('Address'),
    Billing = mongoose.model('Billing');

exports.getOrder = function(req, res) {
 Order.findOne({_id: req.query.orderId})
  .exec(function(err, order){
    if(!order){
        res.json(404, {msg: 'Book Not Found.'});
    } else{
        res.json(product);
  }
});
};

exports.getOrders = function(req, res) {
    Order.findOne({userid: 'customerA'})
     .exec(function(err, orders){
       if(!orders){
           res.json(404, {msg: 'Orders Not Found.'});
       } else{
           res.json(orders);
        }
     });
   };

   exports.addOrder = function(req, res) {
       const orderShipping = new Address(req.body.updatedShipping);
       const orderBilling = new Billing(req.body.updatedBilling);
       const orderItems = req.body.orderItems;
       const newOrder = new Order({userid: 'customerA',
                items: orderItems, shipping: orderShipping,
                billing: orderBilling});

    newOrder.save(function(err, results){
        if(err){
            res.json(500, 'Fail to save order.');
        } else {
            Customer.update({ userid: 'customerA'},
            {$set:{cart:[]}})
            .exec(function(err, results){
                if (err || results <1){
                    res.json(404, {msg: 'Failed to update cart'});
                } else{
                    res.json({msg: 'Order saved.'});
                }
            });
        }
    });
};