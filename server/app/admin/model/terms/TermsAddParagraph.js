let mongoose = require('mongoose');

let termsparagraphschema = mongoose.Schema({
    Terms_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Terms_Description: {
        type: String,
        required: true
    },
    Terms_Image: {
        type: String
    }
})

let termsparagraphmodel = mongoose.model('termsdata', termsparagraphschema)
module.exports = termsparagraphmodel