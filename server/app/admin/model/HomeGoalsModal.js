let mongoose = require('mongoose')

let homegoalsschema = mongoose.Schema({
    Home_Goals_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Home_Goals_Description: {
        type: String,
        required: true
    }
})

let homegoalsdatamodel = mongoose.model('homegoalsdata', homegoalsschema)
module.exports = homegoalsdatamodel