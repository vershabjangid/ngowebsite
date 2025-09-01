let mongoose = require('mongoose')

let homedonationschema = mongoose.Schema({
    Home_Donation_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Home_Donation_Description: {
        type: String,
        required: true
    }
})

let homedonationmodel = mongoose.model('homedonationdata', homedonationschema)
module.exports = homedonationmodel