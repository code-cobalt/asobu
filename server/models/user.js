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
  hobbies: [String],
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
  events: [{ event_id: String, is_creator: Boolean }]
})

const User = mongoose.model('User', UserSchema)
module.exports = User
