let mongoose = require('mongoose');

let newsbannerschema = mongoose.Schema({
    News_Banner_Heading: {
        type: String,
        required: true,
        unique: true
    },
    News_Banner_Description: {
        type: String,
        required: true,
        unique: true
    },
    News_Banner_Image: {
        type: String,
        required: true,
        unique: true
    }
})

let newsbannermodel = mongoose.model('newsbanner', newsbannerschema)
module.exports = newsbannermodel