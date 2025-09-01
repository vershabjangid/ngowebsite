let mongoose = require('mongoose');

let aboutparagraphschema = mongoose.Schema({
    About_Heading: {
        type: String,
        required: true,
        unique: true
    },
    About_Description: {
        type: String,
        required: true
    },
    About_Image: {
        type: String
    }
})

let aboutparagraphmodel = mongoose.model('aboutdata', aboutparagraphschema)
module.exports = aboutparagraphmodel