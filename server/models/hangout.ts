const mongoose = require('mongoose')

//participants will be array of email strings
//status will be 'pending' upon accepted request, 'ongoing' upon meeting, and 'complete' upon finishing
const HangoutSchema = new mongoose.Schema({
  participants: [{
    first_name: String,
    email: String,
    profile_photo: String
  }],
  status: String
})

const Hangout = mongoose.model('Hangout', HangoutSchema)
export = Hangout
