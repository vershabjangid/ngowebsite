let mongoose = require('mongoose')

let hometeamprofileschema = mongoose.Schema({

    Home_Team_Profile_Name: {
        type: String,
        required: true,
        unique: true
    },
    Home_Team_Profile_Designation: {
        type: String,
        required: true
    },
    Home_Team_Profile_Description: {
        type: String,
        required: true
    },
    Home_Team_Profile_Picture: {
        type: String,
        required: true,
        unique: true
    }
})

let hometeamprofiledatamodel = mongoose.model('hometeamprofiledata', hometeamprofileschema)
module.exports = hometeamprofiledatamodel