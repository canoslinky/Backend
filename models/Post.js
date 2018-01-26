var mongoose = require('mongoose')
var User = require('./User.js')

var postSchema = mongoose.Schema({
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    msg: String
})

module.exports = mongoose.model('Post', postSchema)


