var jwt = require('jwt-simple')
var bcrypt = require('bcrypt-nodejs')
var User = require('./models/User.js')
var express = require('express')
var router = express.Router()

router.post('/register',  (req, res) => {
        var userData = req.body;
    
        var user = new User( userData )
        user.save( (err, result) => {
            if(err)
                console.log('Saving user error...')
            
                res.sendStatus(200);
        })
})

router.post('/login', async (req, res) => {
        var loginData = req.body
    
        var user = await User.findOne({email: loginData.email})
    
        if(!user)
            return res.sendStatus(401).send({ message: 'Email or password invalid'})
    
        bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) => {
            if(!isMatch)
                return res.status(401).send({ message: 'Email or password invalid'})
    
            var payload = { subject: user._id }
            var token = jwt.encode(payload, '123')
            res.status(200).send({token})
        })
})

var auth = {
    router,
    checkAuthenticated: (req, res, next) => { 
        if(!req.header('authorization'))
            return res.status(401).send({message: 'Unauthorized. Missing Auth Header'});
        
        var token = req.header('authorization').split(' ')[1];
        var payload = jwt.decode(token, '123');
        if(!payload)
            return res.status(401).send({message: 'Unauthorized. Missing Auth Header'});
    
        req.userId = payload.subject;
        next();
        
    }
}
module.exports = auth;