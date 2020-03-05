const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Product = require('../models/Book')

router.get('/', function (req,res, next){
    Product.find(function(err,docs){
        const productChunks=[];
        const chunkSize = 3;
        for (const i = 0; i <docs.length; i += chunkSize){
            productChunks.push(docs.slice(i, i + chuckSize))
        }
        res.render('shop/index', {title: 'Shopping Cart', products: productChunks})
    });
});

module.exports = router;



// module.exports = function(user){
//     const customers = require('../../client/src/component/shoppingCart/controllers/customers_controller')
//     const products = require('../../client/src/component/shoppingCart/controllers/products_controller')
//     const orders = require('../../client/src/component/shoppingCart/controllers/orders_controllers')
    
//     user.use('/static', express.static('./')).
//         use('/image', express.static('../images')).
//         use('/lib', express.static('../lib')
//     );
//     app.get('/', function (req, res) {
//         res.render('shopping');
//     });

//     user.get('/products/get', products.getProducts);
//     user.get('/orders/get', orders.getOrders);
//     user.post('/orders/add', orders.getaddOrder);
//     user.get('/customers/get', customers.getCustomers);
//     user.post('/customers/update', customers.updateShipping);
//     user.post('/customers/update', customers.updateBilling);
//     user.post('/customers/update', customers.updateCart);
// }