const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    username: String,
    password: String,
    guides: [{type: Schema.Types.ObjectId, ref: 'Guide'}]
})

const User = mongoose.model('User', userSchema)

module.exports = User