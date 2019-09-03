const EventSchema = new mongoose.Schema({
    id: String,
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
modules.export = Event