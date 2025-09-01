let mongoose = require('mongoose')

let certificateschema = mongoose.Schema({
    Certificate_Heading: {
        type: String,
        required: true
    },
    Certificate_Description: {
        type: String,
        required: true
    },
    Certificate_Category: {
        type: String,
        required: true
    },
    Certificate_ID: {
        type: String,
        required: true,
        unique: true
    },
    Date_Of_Issue: {
        type: String,
        required: true
    },
    Send_To: {
        type: String,
        required: true
    },
    Certificate_File: {
        type: String,
        required: true
    }
})

let certificatemodel = mongoose.model('certificate', certificateschema)
module.exports = certificatemodel