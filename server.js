var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var auth = require('./auth.js')
var User = require('./models/User.js')
var Post = require('./models/Post.js')
var jwt = require('jwt-simple')

mongoose.Promise = Promise 
var app = express()

app.use(cors())
app.use(express())
app.use(bodyParser.json())

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

app.get('/profile/:id', async(req, res) =>{ 
    try{
        var user = await User.findById(req.params.id, '-pwd -__v');
        res.send(user);
    }
    catch(error){
        console.error(error)
        res.sendStatus(500);
    }
})

app.get('/posts/:_creator', async (req, res) => {
    try{
        var posts = await Post.find( { _creator : req.params._creator});
        res.send(posts);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})
app.post('/post', (req, res) => {
    var postData = req.body;
    postData._creator = req.userId;

    var post = new Post(postData)
    
    post.save( (err, result) => {
        if(err){
            console.error('saving post error')
            return res.status(500).send({message: 'saving post error'})
        }
        res.sendStatus(200)
    })
})

mongoose.connect('mongodb://test:test@ds211558.mlab.com:11558/psaccount',  (err) => {
    if(!err)
        console.log('connected to mongo')
})

app.use('/auth', auth.router)
app.listen(3000);
