let mongoose = require('mongoose');

let aboutbannerschema = mongoose.Schema({
    About_Banner_Heading: {
        type: String,
        required: true,
        unique: true
    },
    About_Banner_Description: {
        type: String,
        required: true,
        unique: true
    },
    About_Banner_Image: {
        type: String,
        required: true,
        unique: true
    }
})

let aboutbannermodel = mongoose.model('aboutbanner', aboutbannerschema)
module.exports = aboutbannermodel