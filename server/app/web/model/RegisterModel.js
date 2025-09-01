let mongoose = require('mongoose');

let registerschema = mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Phone: {
        type: Number,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        unique: true
    },
    OTP_Value: {
        type: Number,
        required: true
    },
    Expired_In: {
        type: Number,
        required: true
    },
    Is_Verified: {
        type: Number,
        required: true
    }
})


let registermodel = mongoose.model('registers', registerschema)
module.exports = registermodel