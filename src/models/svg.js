const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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
    styles:{
        type: Object,
        required: true
    },
    tags:[{
        tag: {
            type: String
        }
    }],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    private:{
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
})
svgSchema.plugin(mongoosePaginate)
const SVG = mongoose.model('SVG', svgSchema)

module.exports = SVG 