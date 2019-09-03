const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name: String,
    email: String,
    description: String,
    cover_photo: String,
    creator: { first_name: String, email: String },
    start: Date,
    end: Date,
    location: String,
    limit: Number,
    tags: [String],
    comments: [{ from: { first_name: String, email: String }, content: String, timestamp: Date }]
})

const Event = mongoose.model('Event', EventSchema)
module.exports = Event