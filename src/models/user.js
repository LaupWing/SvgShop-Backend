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
        unique:true,
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
            if(!hasNumber.test(value)){
                throw new Error('Password has to contain at least one number bleep bleep')
            }
        }
    }
})
// The .static method on the schema allows us to make our own method on the Usesr model
userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Given info is invalid my man/woman')
    }
    const isMatch = await bcrypt.compare(password, user.password) // compare the given password to the password in stored in the database (user.password)
    if(!isMatch){
        throw new Error('Given info is invalid my man/woman')
    }
    return user
}

userSchema.pre('save', async function(next){ // important to use the keyword function here and NOT the arrow function because it alters the this binding
    // The this in this context refers to the user itself
    const user = this
    console.log('just before saving USER:', user)
    if(user.isModified('password')){ // check if the field of the password is modified
        user.password = await bcrypt.hash(user.password, 8) // 8 stands for how many hashes and 8 is the sweet spot they said

    }

})

const User = mongoose.model('User', userSchema)

module.exports = User 