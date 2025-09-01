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
    },
    Home_Goals_Card_Icon: {
        type: String,
        required: true,
        unique: true
    }
})

let homegoalscardmodel = mongoose.model('homegoalscard', homegoalsschema)
module.exports = homegoalscardmodel