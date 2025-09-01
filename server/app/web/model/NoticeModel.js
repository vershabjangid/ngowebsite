let mongoose = require('mongoose')

let noticeschema = mongoose.Schema({
    Notice_Heading: {
        type: String,
        required: true
    },
    Notice_Description: {
        type: String,
        required: true
    },
    Notice_Reason: {
        type: String,
        required: true
    },
    Send_To: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    }
})

let noticemodel = mongoose.model('notice', noticeschema)
module.exports = noticemodel