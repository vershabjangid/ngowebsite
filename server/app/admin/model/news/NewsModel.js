let mongoose = require('mongoose');

let newsschema = mongoose.Schema({
    News_Heading: {
        type: String,
        required: true,
        unique: true
    },
    News_Description: {
        type: String,
        required: true,
        unique: true
    },
    News_Image: {
        type: String,
        required: true,
        unique: true
    },
    News_Additional_Links: {
        type: String
    },
    News_Date: {
        type: String,
        required: true
    }
})

let newsmodel = mongoose.model('newsdata', newsschema)
module.exports = newsmodel