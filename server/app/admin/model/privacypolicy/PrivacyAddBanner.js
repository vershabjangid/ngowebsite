let mongoose = require('mongoose');

let privacybannerschema = mongoose.Schema({
    Privacy_Banner_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Privacy_Banner_Description: {
        type: String,
        required: true,
        unique: true
    },
    Privacy_Banner_Image: {
        type: String,
        required: true,
        unique: true
    }
})

let privacybannermodel = mongoose.model('privacybanner', privacybannerschema)
module.exports = privacybannermodel