const [User, Event, Message] = [
  require('./models/user'),
  require('./models/event'),
  require('./models/message')
]
const { GraphQLDateTime } = require('graphql-iso-date')
const bcrypt = require('bcrypt')

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

  Login: async params => {
    const document = await User.findOne({ email: params.userEmail })
    if (document) {
      bcrypt.compare(
        params.userPassword,
        document.password_hash,
        (err, valid) => {
          if (err) return { err }
          return valid ? document : { err: 'Invalid Credentials' }
        }
      )
    } else {
      return {
        err: 'No user account associated with that email address found.'
      }
    }
  },

  Events: async () => {
    return await Event.find().sort({ start: -1 })
  },

  Event: async params => {
    return await Event.findById(params.eventId)
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
    if (validation === 'valid') {
      const userObj = Object.assign({}, params.newUser)
      userObj.interests = []
      userObj.hobbies = []
      userObj.exp = 0
      userObj.lvl = 1
      userObj.stats = {}
      userObj.stats.funny = 0
      userObj.stats.intellectual = 0
      userObj.stats.fun = 0
      userObj.stats.kind = 0
      userObj.stats.therapeutic = 0
      userObj.stats.interesting = 0
      userObj.chats = []
      userObj.events = []
      await bcrypt.hash(userObj.password, 10, async (err, hash) => {
        if (err) return { err }
        return await User.create(userObj)
      })
    } else {
      return validation
    }
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

  ResetPassword: async params => {
    const user = await User.findOne({ email: params.userEmail })
    if (!user) return { err: 'Incorrect email.' }
    if (user.pin === params.userPin) {
      bcrypt.hash(params.newPassword, 10, async (err, hash) => {
        if (err) return { err }
        return await User.findOneAndUpdate({ email: params.userEmail }, { password_hash: hash })
      })
    }
  },

  DeleteUser: async params => {
    const user = await User.findOne({ email: params.email })
    if (!user) return { err: 'User Not Found' }
    bcrypt.compare(params.userPassword, user.password_hash, async (err, valid) => {
      if (err) return { err }
      if (!valid) return { err: 'Invalid Password' }
      if (valid) {
        const res = await User.deleteOne({ email: params.email })
        return res.deletedCount === 1
          ? 'Successfully deleted user account.'
          : 'No user with that id found.'
      }
    })
  },

  CreateMessage: async params => {
    const validation = validateMessage(params.newMessage)
    const data = Object.assign({ timestamp: new Date() }, params.newMessage)
    return validation === 'valid' ? await Message.create(data) : validation
  },

  AttendEvent: async params => {
    const event = await Event.findOneAndUpdate(
      { _id: params.eventId },
      { $push: { attendees: params.user } }
    )
    await User.updateOne(
      { email: params.user.email },
      { $push: { events: { event_id: event._id, is_creator: false } } }
    )
    return `${params.user.first_name} will be attending ${event.name}.`
  },

  UnattendEvent: async params => {
    const event = await Event.findOneAndUpdate(
      { _id: params.eventId },
      { $pull: { attendees: { email: params.userEmail } } }
    )
    const user = await User.findOneAndUpdate(
      { email: params.userEmail },
      { $pull: { events: { event_id: params.eventId } } }
    )
    return `${user.first_name} will no longer be attending ${event.name}.`
  },

  AddStats: async params => {
    const user = await User.findOne({ email: params.userEmail })
    const updatedStats = Object.assign({}, user.stats)
    for (const stat in params.newStats) {
      updatedStats[stat] += params.newStats[stat]
    }
    await User.updateOne({ email: params.userEmail }, { stats: updatedStats })
    return updatedStats
  },

  AddExp: async params => { }
}

module.exports = root
