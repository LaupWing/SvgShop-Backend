const mongoose = require('mongoose')
const validator = require( 'validator')

const svgSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    code:{
        type: String,
        required: true,
        trim: true,
    },
    tags:{
        type: Array
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User 