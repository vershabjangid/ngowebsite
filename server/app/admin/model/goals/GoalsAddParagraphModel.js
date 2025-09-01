let mongoose = require('mongoose')

let homegoalsaddparagraphschema = mongoose.Schema({
    Home_Card_Content_Id: {
        type: String,
        required: true,
    },
    Home_Card_Content_Heading: {
        type: String,
        required: true
    },
    Home_Card_Content_Paragraph: {
        type: String,
        required: true,
        unique: true
    },
})

let homegoalsparagraphmodel = mongoose.model('homegoalsparagraph', homegoalsaddparagraphschema)
module.exports = homegoalsparagraphmodel