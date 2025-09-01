let mongoose = require('mongoose')

let hometeammemberschema = mongoose.Schema({
    Home_Team_Member_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Home_Team_Member_Description: {
        type: String,
        required: true
    }
})

let hometeammembermodel = mongoose.model('hometeamheadingdata', hometeammemberschema)
module.exports = hometeammembermodel