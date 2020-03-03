const express = require('express');
module.exports = function(app){
    const customers = require('./')
    const products = require('./')
    const orders = require('./')
    
    app.use('/static', express.static('./')).
        use('/image', express.static('../images')).
        use('/lib', express.static('../lib')
    );
    app.get('/', function (req, res) {
        res.render('shopping');
    });

    app.get('/products/get', products.getProducts);
    app.get('/orders/get', orders.getOrders);
    app.post('/orders/add', orders.getaddOrder);
    app.get('/customers/get', customers.getCustomers);
    app.post('/customers/update', customers.updateShipping);
    app.post('/customers/update', customers.updateBilling);
    app.post('/customers/update', customers.updateCart);



}