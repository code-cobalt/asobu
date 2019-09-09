const [User, Event, Message] = [
  require('./models/user.ts'),
  require('./models/event.ts'),
  require('./models/message.ts')
]
const { GraphQLDateTime } = require('graphql-iso-date')
const bcrypt = require('bcrypt')
import errors from './errors'

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
    const user = await User.findOne({ email: params.userEmail })
    if (user) {
      return user
    } else {
      throw new errors.InvalidEmailError()
    }
  },

  Login: async params => {
    const document = await User.findOne({ email: params.userEmail })
    if (document) {
      // after writing a spec, realized that this function was returning null,
      // not the user document object. In the previous code, the document was only being returned by
      // the bcrypt.compare() callback function, but that wasn't really doing anything for us...it's working how we wanted now.
      const match = await bcrypt.compare(
        params.userPassword,
        document.password_hash
      )
      if (match) {
        return document
      } else {
        throw new errors.InvalidPasswordError()
      }
    } else {
      throw new errors.InvalidEmailError()
    }
  },

  Events: async () => {
    return await Event.find().sort({ start: -1 })
  },

  Event: async params => {
    const event = await Event.findById(params.eventId)
    if (event) {
      return event
    } else {
      throw new errors.InvalidEventIdError()
    }
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
    if (validation === 'valid') {
      return await Event.create(newEvent)
    } else {
      //specific validation error will be nested inside error object
      throw new errors.InvalidEventError({ data: { err: validation } })
    }
  },

  UpdateEvent: async params => {
    const validation = validateUpdatedEvent(params.updatedEvent)
    if (validation === 'valid') {
      return await Event.findOneAndUpdate(
        { _id: params.eventId },
        params.updatedEvent,
        { new: true }
      )
    } else {
      //specific validation error will be nested inside error object
      throw new errors.InvalidEventError({ data: { err: validation } })
    }
  },

  DeleteEvent: async params => {
    const res = await Event.deleteOne({ _id: params.eventId })
    if (res.deletedCount === 1) {
      return 'Successfully deleted event.'
    } else {
      throw new errors.InvalidEventIdError()
    }
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
      //specific validation error will be nested inside error object
      throw new errors.InvalidCommentError({ data: { err: validation } })
    }
  },

  DeleteComment: async params => {
    const event = await Event.findById(params.eventId)
    if (event) {
      const res = await Event.updateOne(
        { _id: params.eventId },
        { $pull: { comments: { _id: params.commentId } } }
      )
      if (res.nModified === 1) {
        return 'Successfully deleted comment.'
      } else {
        throw new errors.InvalidCommentIdError()
      }
    } else {
      throw new errors.InvalidEventIdError()
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
      userObj.sent_hangout_requests = []
      userObj.received_hangout_requests = []
      await bcrypt.hash(userObj.password, 10, async (err, hash) => {
        if (err) return { err }
        return await User.create(userObj)
      })
    } else {
      //specific validation error will be nested inside error object
      throw new errors.InvalidCredentialsError({ data: { err: validation } })
    }
  },

  UpdateUser: async params => {
    const validation = validateUpdatedUser(params.updatedUser)
    if (validation === 'valid') {
      return await User.findOneAndUpdate(
        { email: params.userEmail },
        params.updatedUser,
        { new: true }
      )
    } else {
      //specific validation error will be nested inside error object
      throw new errors.InvalidCredentialsError({ data: { err: validation } })
    }
  },

  ResetPassword: async params => {
    const user = await User.findOne({ email: params.userEmail })
    if (!user) {
      throw new errors.InvalidEmailError()
    }
    if (user.pin === params.userPin) {
      bcrypt.hash(params.newPassword, 10, async (err, hash) => {
        if (err) throw new Error(err)
        return await User.findOneAndUpdate(
          { email: params.userEmail },
          { password_hash: hash }
        )
      })
    } else {
      throw new errors.InvalidPinError()
    }
  },

  DeleteUser: async params => {
    const user = await User.findOne({ email: params.email })
    if (!user) return { err: 'User Not Found' }
    bcrypt.compare(
      params.userPassword,
      user.password_hash,
      async (err, valid) => {
        if (err) throw new Error(err)
        if (!valid) return { err: 'Invalid Password' }
        if (valid) {
          const res = await User.deleteOne({ email: params.email })
          if (res.deletedCount === 1) {
            return 'Successfully deleted user account.'
          } else {
            throw new errors.InvalidEmailError()
          }
        }
      }
    )
  },

  CreateMessage: async params => {
    const validation = validateMessage(params.newMessage)
    const data = Object.assign({ timestamp: new Date() }, params.newMessage)
    if (validation === 'valid') {
      return await Message.create(data)
    } else {
      //specific validation error will be nested inside error object
      throw new errors.InvalidMessageError({ data: { err: validation } })
    }
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

  AddExp: async params => {},

  RequestHangout: async params => {
    //will add hangout to userfrom sent_hangout_requests and to userto received_hangout_requests
  },

  ApproveHangout: async params => {
    //will delete hangout from userfrom sent_hangout_requests and from userto received_hangout_requests
    //will also create new chat between users (if one doesn't already exist)
  }
}

export = root
