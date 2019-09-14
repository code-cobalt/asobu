const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  phone_number: String,
  pin: Number,
  password_hash: String,
  profile_photo: String,
  interests: [String],
  exp: Number,
  lvl: Number,
  stats: {
    funny: Number,
    intellectual: Number,
    fun: Number,
    kind: Number,
    therapeutic: Number,
    interesting: Number
  },
  chats: [
    {
      chat_id: Number,
      participants: [
        { first_name: String, email: String, profile_photo: String }
      ]
    }
  ],
  events: [{ event_id: String, is_creator: Boolean }],
  sent_hangout_requests: [
    { first_name: String, email: String, profile_photo: String }
  ],
  received_hangout_requests: [
    { first_name: String, email: String, profile_photo: String }
  ],
  ongoing_hangouts: [
    { first_name: String, email: String, profile_photo: String }
  ],
  pending_reviews: [
    { first_name: String, email: String, profile_photo: String }
  ],
  blocked_users: [String]
})

const User = mongoose.model('User', UserSchema)
export = User
