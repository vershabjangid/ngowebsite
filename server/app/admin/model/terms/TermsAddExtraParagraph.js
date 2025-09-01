let mongoose = require('mongoose');

let termsextraparagraphschema = mongoose.Schema({
    Terms_Section_Id: {
        type: String,
        required: true
    },
    Terms_Paragraph: {
        type: String,
        required: true
    }
})

let termsextraparagraphmodel = mongoose.model('termsaboutdata', termsextraparagraphschema)
module.exports = termsextraparagraphmodel