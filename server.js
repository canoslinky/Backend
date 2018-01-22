var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var app = express()

app.use(cors())
app.use(express())
app.use(bodyParser.json())

var posts = [
    { message: 'Hola' },
    { message: 'Mundo' }
]

app.get( '/posts', (req, res ) =>{
    res.send(posts)
})

app.post('/register', (req, res) => {
    var userData = req.body;
    console.log(userData.email);
    res.sendStatus(200);
})

mongoose.connect('mongodb://test:test@ds211558.mlab.com:11558/psaccount',  (err) => {
    if(!err)
        console.log('connected to mongo')
})
app.listen(3000);
