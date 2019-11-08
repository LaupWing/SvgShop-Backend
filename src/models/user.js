const mongoose = require('mongoose')
const validator = require( 'validator')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid fellow human')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('You cant be below 0 years old my man')
            }
        }
    },
    password:{
        type:  String,
        minlength: 7,
        trim: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User 