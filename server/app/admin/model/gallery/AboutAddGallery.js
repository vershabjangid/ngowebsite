let mongoose = require('mongoose');

let gallerybannerschema = mongoose.Schema({
    Gallery_Banner_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Gallery_Banner_Description: {
        type: String,
        required: true,
        unique: true
    },
    Gallery_Banner_Image: {
        type: String,
        required: true,
        unique: true
    }
})

let gallerybannermodel = mongoose.model('gallerybanner', gallerybannerschema)
module.exports = gallerybannermodel