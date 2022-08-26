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


exports.signin = (req,res,next)=>{
    User.findOne({email: req.body.email}).then(
        (user) =>{ 
            if (!user){ //Cannot find email in the DB
                return res.status(404).json({
                    error: new Error('User not found!')
                });
            }
            bcrypt.compare(user.password, req.body.password).then(
                (valid)=>{
                    if (!valid){
                        return res.status(401).json({
                            error: new Error('Incorrect password!')
                        });
                    }
                    const token = jwt.sign(
                        {userId: user._id},
                        'Radnom_token',
                        {expiresIn:'48h'}
                    )
                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                } 
            ).catch(
                (error)=>{
                    res.status(500).json({
                        error: error
                    });
                }
            )
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                error:error
            });
        }
    );
}