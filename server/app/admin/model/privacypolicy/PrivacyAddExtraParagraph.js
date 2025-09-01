let mongoose = require('mongoose');

let privacyextraparagraphschema = mongoose.Schema({
    Privacy_Section_Id: {
        type: String,
        required: true
    },
    Privacy_Paragraph: {
        type: String,
        required: true
    }
})

let privacyextraparagraphmodel = mongoose.model('privacyparagraphdata', privacyextraparagraphschema)
module.exports = privacyextraparagraphmodel