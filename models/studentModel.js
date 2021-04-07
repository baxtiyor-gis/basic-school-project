const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    dateOfVisit: {
        type: Date,
        default: Date.now()
    },
    sourceOfInformation: {
        type: String,
        enum: [
            'Acquaintance',
            'Casual',
            'Facebook',
            'Instagram',
            'Telegram',
            'Tiktok',
            'Website'
        ]
    },
    probableTime: {
        type: String
    },
    subject: {
        type: String,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
        enum: [
            'Rejected',
            'Accepted',
            'Waiting'],
        default: 'Waiting'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
})
module.exports = mongoose.model('Student', Schema)