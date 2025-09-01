let mongoose = require('mongoose');


let queriesschema = mongoose.Schema({
    Full_Name: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    }
}, { timestamps: true });



let queriesmodel = mongoose.model('queries', queriesschema);
module.exports = queriesmodel;