let mongoose = require('mongoose')

let homegalleryschema = mongoose.Schema({
    Home_Gallery_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Home_Gallery_Description: {
        type: String,
        required: true
    }
})

let homegallerydatamodel = mongoose.model('homegallerydata', homegalleryschema)
module.exports = homegallerydatamodel