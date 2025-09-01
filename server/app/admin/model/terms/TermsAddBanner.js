let mongoose = require('mongoose');

let termsbannerschema = mongoose.Schema({
    Terms_Banner_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Terms_Banner_Description: {
        type: String,
        required: true,
        unique: true
    },
    Terms_Banner_Image: {
        type: String,
        required: true,
        unique: true
    }
})

let termsbannermodel = mongoose.model('termsbanner', termsbannerschema)
module.exports = termsbannermodel