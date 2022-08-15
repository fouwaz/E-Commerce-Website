//Controllers for the user related requests
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then((hash)=>{
        const user = new User({
            email: req.body.email,
            password = hash
        })
        user.save()
        .then(()=>{
            res.status(201).json({message: 'user created successfully!'});
        }).catch((error)=>{
            res.status(500).json({error: error});
        });
    }).catch((error)=>{
        res.status(500).json({error: error});
    });
};


exports.signin = (req, res, next) => {
    User.findOne({email: req.body.email}).then((user)=>{
        if (!user){ //If the email was incorrect
            return res.status(404).json({error: new Error('User not found')});
        }
        bcrypt.compare(req.body.password, user.password) //check that the input password is the same as the one in the db
        .then((valid)=>{
            if (!valid){ //if the password is correct
                return res.status(401).json({
                    error: new Error('Incorrect password!')
                });
            }
            const token = jwt.sign( //creating a token
                {userId: user._id},
                'TOKEN-STRING', 
                {expiresIn: '24h'}
            );
            res.status(200).json({ //Returning the token back to the front end along with the user id
                userId: user._id,
                token: token  
            });
        })
        .catch((error)=>{ //catching the bcrypt compare error if it occurs.
            return res.status(500).json({
                error: error
            });
        });
    }).catch((error)=>{
        res.status(500).json({error: error});
    });
};