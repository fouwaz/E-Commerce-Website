const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');


//Creating the app
const app = express();

/* 
*This is a builtin middlewear
* It parses incoming JSON requests and puts
* them in req.body
*/
app.use(express.json());



//This will allow requests from all origins to access your API
app.use((req,res,next)=>{
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Origin','Origin, C-Requested-With, Content, Accept, Content-type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/items',itemRoutes);
app.use('/api/auth',userRoutes);


module.exports = app;