const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    fullName: {
        type: String, required: true
    },
    phone: {
        type: String, required: true
    },
    subject: {
        type: String, required: true
    },
    date: {
        type: Date, default: Date.now()
    }
})
module.exports = mongoose.model('Teacher', Schema)