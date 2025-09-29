let mongoose = require('mongoose');

let newstextraparagraphschema = mongoose.Schema({
    News_Section_Id: {
        type: String,
        required: true
    },
    News_Paragraph: {
        type: String,
        required: true
    },
    News_Image: {
        type: String
    },
    News_Sub_Heading: {
        type: String,
        required: true
    }
})

let newstextraparagraphmodel = mongoose.model('extranewsdata', newstextraparagraphschema)
module.exports = newstextraparagraphmodel