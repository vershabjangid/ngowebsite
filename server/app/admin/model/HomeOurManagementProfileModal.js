let mongoose = require('mongoose')

let homemanagementprofileschema = mongoose.Schema({

    Home_Management_Profile_Name: {
        type: String,
        required: true,
        unique: true
    },
    Home_Management_Profile_Designation: {
        type: String,
        required: true
    },
    Home_Management_Profile_Description: {
        type: String,
        required: true,
        unique: true
    },
    Home_Management_Profile_Picture: {
        type: String,
        required: true,
        unique: true
    }
})

let homemanagementprofiledatamodel = mongoose.model('homemanagementprofiledata', homemanagementprofileschema)
module.exports = homemanagementprofiledatamodel