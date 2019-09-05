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

  Events: args => {
    return Event.find().sort({ start: -1 })
  },

  Event: async args => {
    return await Event.findById(args.id)
  },

  Chats: async ids => {
    return await Message.aggregate([
      { $match: { chat_id: { $in: ids.ids } } },
      {
        $group: {
          _id: '$chat_id',
          messages: {
            $push: {
              id: '$_id',
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
    const validation = validateUpdatedEvent(params.newEvent)
    if (validation !== 'valid') {
      return validation
    } else {
      await Event.insertMany(params.newEvent)
      return params.newEvent
    }
  },

  UpdateEvent: async params => {
    const validation = validateUpdatedEvent(params.updatedEvent)
    if (validation !== 'valid') {
      return validation
    } else {
      Event.updateOne({ _id: params.eventId }, params.updatedEvent)
      //return updated event
    }
  },

  DeleteEvent: async params => {
    await Event.deleteOne({ _id: params.eventId })
    return 'Deleted event'
  },

  CreateUser: async params => {
    const validation = validateNewUser(params.newUser)
    if (validation !== 'valid') {
      return validation
    } else {
      await User.insertOne(params.newUser)
      return params.newUser
    }
  },

  UpdateUser: async params => {
    const validation = validateUpdatedUser(params.updatedUser)
    if (validation !== 'valid') {
      return validation
    } else {
      await User.updateOne({ email: params.userEmail }, params.updatedUser)
      //return udpated user
    }
  },

  DeleteUser: async params => {
    await User.deleteOne({ _id: params.userId })
    return 'Deleted user'
  },

  CreateMessage: async params => {
    const validation = validateMessage(params.newMessage)
    if (validation !== 'valid') {
      return validation
    } else {
      await Message.insertOne(params.newMessage)
      return params.newMessage
    }
  }
}

module.exports = root
