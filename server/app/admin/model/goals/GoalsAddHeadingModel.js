let mongoose = require('mongoose')

let homegoalsaddheadingschema = mongoose.Schema({
    Home_Card_Id: {
        type: String,
        required: true,
    },
    Home_Card_Paragraph_Heading: {
        type: String,
        required: true,
        unique: true
    }
})

let homegoalsaddheadingmodel = mongoose.model('homegoalsheading', homegoalsaddheadingschema)
module.exports = homegoalsaddheadingmodel