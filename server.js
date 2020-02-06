const express = require('express');

const app = express();

//Comment Testing   

app.get('/api/customers', (_req, res) => {
    const customers =[
        {id:1, firstName: 'Juan', lastName: 'Serret'},
        {id:2, firstName: 'Vanessa', lastName: 'Serret'},
        {id:3, firstName: 'Sarah', lastName: 'Whiddon'}
    ];
    res.json(customers);
});

const port = 5000;

app.listen(port, ()=> console.log('Server started on port ${port}'));

