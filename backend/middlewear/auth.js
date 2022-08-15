const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]; //get the token from the request
        const decodedToken = jwt.verify(token , 'TOKEN-STRING'); // get the decoded token
        const userId = decodedToken.userId;
        req.auth = {userId: userId}; // Create a req.auth object
        if (req.body.userId && req.body.userId !== userId){
            throw 'invalid user ID!';
        }else{
            next();
        }
    } catch {
        res.status(401).json({error: new Error('Invalid request!')});
    }
}