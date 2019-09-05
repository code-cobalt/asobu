const [User, Event, Message] = [
  require('./models/user'),
  require('./models/event'),
  require('./models/message')
]
const { GraphQLDateTime } = require('graphql-iso-date')

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

  User: async email => {
    return await User.findOne(email)
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
    if (validation !== 'valid') {
      return validation
    } else {
      await Event.create(params.newEvent)
      return params.newEvent
    }
  },

  UpdateEvent: async params => {
    const validation = validateUpdatedEvent(params.updatedEvent)
    if (validation !== 'valid') {
      return validation
    } else {
      return await Event.findOneAndUpdate(
        { _id: params.eventId },
        params.updatedEvent,
        { new: true }
      )
    }
  },

  CreateComment: async params => {
    const timestamp = new Date()
    const newComment = Object.assign({ timestamp }, params.newComment)
    await Event.updateOne(
      { _id: params.eventId },
      { $push: { comments: newComment } }
    )
    return newComment
  },

  DeleteEvent: async params => {
    await Event.deleteOne({ _id: params.eventId })
    return 'Successfully deleted event.'
  },

  CreateUser: async params => {
    const validation = validateNewUser(params.newUser)
    if (validation !== 'valid') {
      return validation
    } else {
      await User.create(params.newUser)
      return params.newUser
    }
  },

  UpdateUser: async params => {
    const validation = validateUpdatedUser(params.updatedUser)
    if (validation !== 'valid') {
      return validation
    } else {
      await User.findOneAndUpdate(
        { email: params.userEmail },
        params.updatedUser,
        { new: true }
      )
    }
  },

  DeleteUser: async params => {
    await User.deleteOne({ _id: params.userId })
    return 'Successfully deleted user account.'
  },

  CreateMessage: async params => {
    const validation = validateMessage(params.newMessage)
    if (validation !== 'valid') {
      return validation
    } else {
      const data = Object.assign({ timestamp: new Date() }, params.newMessage)
      return await Message.create(data)
    }
  }
}

module.exports = root
