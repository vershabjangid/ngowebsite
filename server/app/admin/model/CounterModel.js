let mongoose = require('mongoose')

let counterschema = mongoose.Schema({
    Home_Counter_Heading: {
        type: String,
        required: true,
        unique: true
    },
    Counter_Value: {
        type: String,
        required: true
    },
    CounterIcon: {
        type: String,
        required: true,
        unique: true
    }
})

let countermodel = mongoose.model('counterdata', counterschema)
module.exports = countermodel