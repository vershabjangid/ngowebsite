let mongoose = require('mongoose')

let homegalleryschema = mongoose.Schema({
    Gallery_Event_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Gallery_Event_Description: {
        type: String,
        required: true
    },
    Gallery_Event_Image: {
        type: String,
        required: true,
        unique: true
    }
})

let homegalleryimagesdatamodel = mongoose.model('homegalleryimages', homegalleryschema)
module.exports = homegalleryimagesdatamodel