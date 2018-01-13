var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()

app.use(cors())
app.use(express())

var posts = [
    { message: 'Hello' },
    { message: 'World' }
]

app.get( '/posts', (req, res ) =>{
    res.send(posts)
})

app.post('/register', (req, res) => {
    var userData = req.body;
    console.log(userData.email);
    res.sendStatus(200);
})

app.listen(3000);
