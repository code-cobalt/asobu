const [User, Event, Message] = [
  require('./models/user'),
  require('./models/event'),
  require('./models/message')
]
const { GraphQLDateTime } = require('graphql-iso-date')

// validation methods will return string with error message if not valid
const validateNewUser = user => {
  return 'valid'
}

const validateUpdatedUser = user => {
  return 'valid'
}

const validateNewEvent = event => {
  return 'valid'
}

const validateUpdatedEvent = event => {
  return 'valid'
}

const validateMessage = message => {
  return 'valid'
}

const root = {
  DateTime: GraphQLDateTime,

  Users: () => {
    return User.find()
  },

  User: async params => {
    return await User.findOne({ email: params.userEmail })
  },

  Events: async args => {
    return await Event.find().sort({ start: -1 })
  },

  Event: async args => {
    return await Event.findById(args.eventId)
  },

  Chats: async params => {
    return await Message.aggregate([
      { $match: { chat_id: { $in: params.chatIds } } },
      {
        $group: {
          _id: '$chat_id',
          messages: {
            $push: {
              id: '$_id',
              chat_id: '$chat_id',
              content: '$content',
              timestamp: '$timestamp',
              from: '$from'
            }
          }
        }
      }
    ])
  },

  CreateEvent: async params => {
    const validation = validateNewEvent(params.newEvent)
    return validation === 'valid'
      ? await Event.create(params.newEvent)
      : validation
  },

  UpdateEvent: async params => {
    const validation = validateUpdatedEvent(params.updatedEvent)
    return validation === valid
      ? await Event.findOneAndUpdate(
          { _id: params.eventId },
          params.updatedEvent,
          { new: true }
        )
      : validation
  },

  DeleteEvent: async params => {
    const res = await Event.deleteOne({ _id: params.eventId })
    return res.deletedCount === 1
      ? 'Successfully deleted event.'
      : 'No event with that id found.'
  },

  CreateComment: async params => {
    const newComment = Object.assign(
      { timestamp: new Date() },
      params.newComment
    )
    await Event.updateOne(
      { _id: params.eventId },
      { $push: { comments: newComment } }
    )
    return newComment
  },

  DeleteComment: async params => {
    const res = await Event.updateOne(
      { _id: params.eventId },
      { $pull: { comments: { _id: params.commentId } } }
    )
    return res.nModified === 1
      ? 'Successfully deleted comment.'
      : 'Did not delete any comments. Double-check the ids are correct.'
  },

  CreateUser: async params => {
    const validation = validateNewUser(params.newUser)
    return validation === 'valid'
      ? await User.create(params.newUser)
      : validation
  },

  UpdateUser: async params => {
    const validation = validateUpdatedUser(params.updatedUser)
    return validation === 'valid'
      ? await User.findOneAndUpdate(
          { email: params.userEmail },
          params.updatedUser,
          { new: true }
        )
      : validation
  },

  DeleteUser: async params => {
    const res = await User.deleteOne({ email: params.email })
    return res.deletedCount === 1
      ? 'Successfully deleted user account.'
      : 'No user with that id found.'
  },

  CreateMessage: async params => {
    const validation = validateMessage(params.newMessage)
    const data = Object.assign({ timestamp: new Date() }, params.newMessage)
    return validation === 'valid' ? await Message.create(data) : validation
  },

  AttendEvent: async params => {
    //should update user events AND event attendees
  },

  AddStats: async params => {}
}

module.exports = root
