

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 5000; 

// app.get('/api/customers', (_req, res) => {
//     const customers =[
//         {id:1, firstName: 'Juan', lastName: 'Serret'},
//         {id:2, firstName: 'Vanessa', lastName: 'Serret'},
//         {id:3, firstName: 'Sarah', lastName: 'Whiddon'}
//     ];
//     res.json(customers);
// });


const mongoURI = 'mongodb+srv://admin:admin123@cluster0-ywzdx.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {useUnifiedTopology: true, useNewUrlParser: true})
    .catch(err => console.log(err));

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database conncetion established successfully");
});

app.listen(port, ()=> console.log('Server started on port ${port}'));
