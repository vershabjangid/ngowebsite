let mongoose = require('mongoose')

let homebannerschema = mongoose.Schema({
    Home_Banner_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Home_Banner_Description: {
        type: String,
        required: true
    },
    Home_Banner_Image: {
        type: String,
        required: true,
        unique: true
    }
})

let homebannerslidesmodel = mongoose.model('homebannerslides', homebannerschema)
module.exports = homebannerslidesmodel