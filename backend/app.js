// Mongo DB Password for 'fouzi'user: EjSBG9EjOWQp7gh9
// Mondo DB connection: mongodb+srv://<username>:<password>@cluster0.2i3xy.mongodb.net/?retryWrites=true&w=majority


//  importing modules and stuff
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');


//Setting up the connection to my mongoDB db
mongoose.connect('mongodb+srv://fouzi:EjSBG9EjOWQp7gh9@cluster0.2i3xy.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Successfully connected to the mongoDB atlas');
})
.catch((error)=>{
    console.log('unable to connect to MONGO DB atlats');
    console.error(error);
});

//calling the app    
const app = express();


//This will allow requests from all origins to access your API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


/* 
*This is a builtin middlewear
* It parses incoming JSON requests and puts
* them in req.body
*/
app.use(express.json());

//Linking the app to our routers

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/stuff',stuffRoutes);
app.use('/api/auth',userRoutes);




module.exports = app;