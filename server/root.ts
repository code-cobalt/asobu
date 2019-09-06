const [User, Event, Message] = [
  require('./models/user'),
  require('./models/event'),
  require('./models/message')
]
const { GraphQLDateTime } = require('graphql-iso-date')
const bcrypt = require('bcrypt')

interface NewUser {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  pin: number
  password_hash: string
  profile_photo: string
  interests: Array<string>
  exp: number
  lvl: number
  stats: Stats
  imei: string
}

interface UpdatedUser {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  profile_photo: string
  interests: Array<string>
}

interface Stats {
  funny: number
  intellectual: number
  fun: number
  kind: number
  therapeutic: number
  interesting: number
}

interface UserLimited {
  first_name: String
  email: String
  profile_photo: String
}

interface NewEvent {
  name: string
  email: string
  description: string
  cover_photo: string
  creator: UserLimited
  start: Date
  end: Date
  location: string
  limit: number
  tags: Array<string>
}

interface UpdatedEvent {
  name: string
  email: string
  description: string
  cover_photo: string
  start: Date
  end: Date
  location: string
  limit: number
  tags: Array<string>
}

interface Comment {
  from: UserLimited
  content: string
  timestamp: Date
}

interface Message {
  chat_id: number
  from: UserLimited
  timestamp: Date
  content: string
}

// validation methods will return string with error message if not valid
const validateNewUser = (newUser: NewUser) => {
  return 'valid'
}

const validateUpdatedUser = (updatedUser: UpdatedUser) => {
  return 'valid'
}

const validateNewEvent = (newEvent: NewEvent) => {
  return 'valid'
}

const validateUpdatedEvent = (updatedEvent: UpdatedEvent) => {
  return 'valid'
}

const validateComment = (comment: Comment) => {
  return 'valid'
}

const validateMessage = (message: Message) => {
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
    const newEvent = Object.assign({}, params.newEvent, {
      attendees: [],
      comments: []
    })
    return validation === 'valid'
      ? await Event.create(newEvent)
      : { err: validation }
  },

  UpdateEvent: async params => {
    const validation = validateUpdatedEvent(params.updatedEvent)
    return validation === 'valid'
      ? await Event.findOneAndUpdate(
          { _id: params.eventId },
          params.updatedEvent,
          { new: true }
        )
      : { err: validation }
  },

  DeleteEvent: async params => {
    const res = await Event.deleteOne({ _id: params.eventId })
    return res.deletedCount === 1
      ? 'Successfully deleted event.'
      : { err: 'No event with that id found.' }
  },

  CreateComment: async params => {
    const validation = validateComment(params.newComment)
    if (validation === 'valid') {
      const newComment = Object.assign(
        { timestamp: new Date() },
        params.newComment
      )
      await Event.updateOne(
        { _id: params.eventId },
        { $push: { comments: newComment } }
      )
      return newComment
    } else {
      return { err: validation }
    }
  },

  DeleteComment: async params => {
    const res = await Event.updateOne(
      { _id: params.eventId },
      { $pull: { comments: { _id: params.commentId } } }
    )
    return res.nModified === 1
      ? 'Successfully deleted comment.'
      : {
          err: 'Did not delete any comments. Double-check the ids are correct.'
        }
  },

  CreateUser: async params => {
    const validation = validateNewUser(params.newUser)
    if (validation === 'valid') {
      const userObj = Object.assign({}, params.newUser)
      userObj.interests = []
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
      return { err: validation }
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
      : { err: validation }
  },

  ResetPassword: async params => {
    const user = await User.findOne({ email: params.userEmail })
    if (!user) return { err: 'Incorrect email.' }
    if (user.pin === params.userPin) {
      bcrypt.hash(params.newPassword, 10, async (err, hash) => {
        if (err) return { err }
        return await User.findOneAndUpdate(
          { email: params.userEmail },
          { password_hash: hash }
        )
      })
    }
  },

  DeleteUser: async params => {
    const user = await User.findOne({ email: params.email })
    if (!user) return { err: 'User Not Found' }
    bcrypt.compare(
      params.userPassword,
      user.password_hash,
      async (err, valid) => {
        if (err) return { err }
        if (!valid) return { err: 'Invalid Password' }
        if (valid) {
          const res = await User.deleteOne({ email: params.email })
          return res.deletedCount === 1
            ? 'Successfully deleted user account.'
            : { err: 'No user with that id found.' }
        }
      }
    )
  },

  CreateMessage: async params => {
    const validation = validateMessage(params.newMessage)
    const data = Object.assign({ timestamp: new Date() }, params.newMessage)
    return validation === 'valid'
      ? await Message.create(data)
      : { err: validation }
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

  AddExp: async params => {}
}

export = root
