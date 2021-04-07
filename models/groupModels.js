const mongoose = require('mongoose')





const Schema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    subject: {
        type: String, required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    startDate: {
        type: Date,  default: Date.now()
    },
    date: {
        type: String
    },
    time: {
        type: String, required: true
    },
    price: {
        type: Number,
    }

})
module.exports = mongoose.model('Group', Schema)