const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost/cart')
require('../models/Cart');
const app = express();
app.engine('.html', require('ejs')._express);
app.set('views', __dirname  + '/views');
app.set('view engine', 'html');
app.use(bodyParser());
require('./routes/Cart')(app);
app.listen(80);