var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var app = express()

var User = require('./models/User.js')

app.use(cors())
app.use(express())
app.use(bodyParser.json())

app.post('/register', (req, res) => {
    var userData = req.body;

    var user = new User( userData )
    user.save( (err, result) => {
        if(err)
            console.log('Saving user error...')
        
            res.sendStatus(200);
            
    })
    
})

app.post('/login', async (req, res) => {
    var loginData = req.body

    var user = await User.findOne({email: loginData.email})

    if(!user)
        return res.sendStatus(401).send({ message: 'Email or password invalid'})

    if(user.pwd != loginData.pwd)
        return res.sendStatus(401).send({ message: 'Email or password invalid'})
    
    var payload = {}
    var token = jwt.encode(payload, '123')
    res.sendStatus(200).send({token})

})

app.get('/users', async( req, res) =>{
    try {
        var users = await User.find({}, '-pwd -__v');
        res.send(users)
    }
    catch(error)
    {
        console.error(error)
        res.sendStatus(500)
    }
} )

mongoose.connect('mongodb://test:test@ds211558.mlab.com:11558/psaccount',  (err) => {
    if(!err)
        console.log('connected to mongo')
})
app.listen(3000);
