const mongoose = require('mongoose')

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

const Svg = mongoose.model('SVg', svgSchema)

module.exports = Svg 