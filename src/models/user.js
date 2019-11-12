const mongoose = require('mongoose')
const validator = require( 'validator')
const bcrypt = require('bcryptjs')

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
                throw new Error('You cant be below 0 years old my very young man')
            }
        }
    },
    password:{
        type:  String,
        minlength: 7,
        trim: true,
        required: true,
        validate(value){
            var hasNumber = /\d/;
            if(!hasNumber(value)){
                throw new Error('Password has to contain at least one number bleep bleep')
            }
        }
    }
})

userSchema.pre('save', async function(next){ // important to use the keyword function here and NOT the arrow function because it alters the this binding
    // The this in this context refers to the user itself
    const user = this
    console.log('just before saving USER:', user)
    if(user.isModified('password')){ // check if the field of the password is modified
        console.log('passwword modified')
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User 