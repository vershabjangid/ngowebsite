let mongoose = require('mongoose');

let aboutextraparagraphschema = mongoose.Schema({
    About_Section_Id: {
        type: String,
        required: true
    },
    About_Paragraph: {
        type: String,
        required: true
    }
})

let aboutextraparagraphmodel = mongoose.model('extraaboutdata', aboutextraparagraphschema)
module.exports = aboutextraparagraphmodel