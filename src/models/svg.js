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
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const SVG = mongoose.model('SVG', svgSchema)

module.exports = SVG 