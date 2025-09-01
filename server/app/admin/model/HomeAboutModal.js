let mongoose = require('mongoose')

let homebannerschema = mongoose.Schema({

    Home_About_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Home_About_Description: {
        type: String,
        required: true
    },
    Home_About_Image: {
        type: String,
        required: true,
        unique: true
    }
})

let homeaboutdatamodel = mongoose.model('homeaboutdata', homebannerschema)
module.exports = homeaboutdatamodel