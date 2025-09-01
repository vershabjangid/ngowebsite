let mongoose = require('mongoose');

let privacyparagraphschema = mongoose.Schema({
    Privacy_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Privacy_Description: {
        type: String,
        required: true
    },
    Privacy_Image: {
        type: String
    }
})

let privacyparagraphmodel = mongoose.model('privacydata', privacyparagraphschema)
module.exports = privacyparagraphmodel