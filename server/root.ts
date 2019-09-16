const [User, Event, Message, Hangout] = [
  require('./models/user.ts'),
  require('./models/event.ts'),
  require('./models/message.ts'),
  require('./models/hangout.ts')
]
const { GraphQLDateTime } = require('graphql-iso-date')
const bcrypt = require('bcrypt')
import errors from './errors'
import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()

interface NewUser {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  pin: number
  password_hash: string
  profile_photo: string
  interests: string[]
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
  interests: string[]
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
  tags: string[]
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
  tags: string[]
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

//starting chatId at 5 to avoid duplication with seeds
let chatId: number = 5

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

interface UserChat {
  chat_id: number
  participants: Array<UserLimited>
}

const checkForExistingChat = (
  currentUserChats: Array<UserChat>,
  matchedUserEmail: string
) => {
  //return false or pre-existing chat
  for (const chat of currentUserChats) {
    if (
      chat.participants.length === 1 &&
      chat.participants[0].email === matchedUserEmail
    ) {
      return chat
    }
  }
  return false
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

  Chat: async params => {
    const chat = await Message.aggregate([
      { $match: { chat_id: params.chatId } },
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
    return chat.pop()
  },

  CreateEvent: async params => {
    const validation = validateNewEvent(params.newEvent)
    const newEvent = Object.assign({}, params.newEvent, {
      attendees: [],
      comments: []
    })
    if (validation === 'valid') {
      const event = await Event.create(newEvent)
      await User.updateOne(
        { email: event.creator.email },
        { $push: { events: { event_id: event.id, is_creator: true } } }
      )
      return event
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
    await User.updateMany(
      {},
      { $pull: { events: { event_id: params.eventId } } }
    )
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
      const updatedEvent = await Event.findOneAndUpdate(
        { _id: params.eventId },
        { $push: { comments: newComment } },
        { new: true }
      )
      return {
        ...newComment,
        id: updatedEvent.comments[updatedEvent.comments.length - 1]._id
      }
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
    //refactored and added new additional properties
    if (validation === 'valid') {
      const userObj = Object.assign({}, params.newUser, {
        interests: [],
        exp: 0,
        lvl: 1,
        stats: {
          funny: 0,
          intellectual: 0,
          fun: 0,
          kind: 0,
          therapeutic: 0,
          interesting: 0
        },
        chats: [],
        events: [],
        sent_hangout_requests: [],
        received_hangout_requests: [],
        ongoing_hangouts: [],
        pending_revies: [],
        blocked_users: [],
        blocked_by_users: []
      })
      const hash = bcrypt.hashSync(userObj.password, 10)
      userObj.password_hash = hash
      delete userObj.password
      return await User.create(userObj)
    } else {
      //specific validation error will be nested inside error object
      throw new errors.InvalidCredentialsError({ data: { err: validation } })
    }
  },

  UpdateUser: async params => {
    // TO DO When a user is updated, must also update userlimited object in all other places they can be located:
    // event attendees, comments, & creator,
    // messages,
    // user chats
    // user sent and received hangout requests,
    // ongoing hangouts,
    // pending reviews
    //yikes...!
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
      pubsub.publish('messageAdded', data) //verify this line is passing data correctly and should be called here
      return await Message.create(data)
    } else {
      //specific validation error will be nested inside error object
      throw new errors.InvalidMessageError({ data: { err: validation } })
    }
  },

  //Subscription property here
  MessageAdded: {
    subscribe: () => pubsub.asyncIterator('messageAdded')
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

  ReviewUser: async params => {
    // TO DO: need to delete reviewedUser from currentUser's pending reviews
    const user = await User.findOne({ email: params.reviewedUserEmail })
    const updatedStats = Object.assign({}, user.stats)
    for (const stat in params.newStats) {
      updatedStats[stat] += params.newStats[stat]
    }
    await User.updateOne(
      { email: params.reviewedUserEmail },
      { stats: updatedStats }
    )
    return updatedStats
  },

  AddExp: async params => {
    // implement level checking
    const user = await User.findOneAndUpdate(
      { email: params.userEmail },
      { $inc: { exp: params.points } },
      { new: true }
    )
    //return new exp total
    return user.exp
  },

  SendHangoutRequest: async params => {
    //will add hangout to current user sent_hangout_requests and to target user received_hangout_requests
    const currentUser = await User.findOne({ email: params.currentUserEmail })
    const toUser = await User.findOne({ email: params.toUserEmail })
    if (!currentUser || !toUser) {
      throw new errors.InvalidEmailError()
    } else {
      const fromUserLimited = {
        email: params.currentUserEmail,
        first_name: currentUser.first_name,
        profile_photo: currentUser.profile_photo
      }
      const toUserLimited = {
        email: params.toUserEmail,
        first_name: toUser.first_name,
        profile_photo: toUser.profile_photo
      }
      await User.updateOne(
        { email: params.currentUserEmail },
        { $push: { sent_hangout_requests: toUserLimited } }
      )
      await User.updateOne(
        { email: params.toUserEmail },
        { $push: { received_hangout_requests: fromUserLimited } }
      )
      return `${params.currentUserEmail} has successfully sent a hangout request to ${params.toUserEmail}!`
    }
  },

  AcceptHangoutRequest: async params => {
    //will delete hangout from fromUser sent_hangout_requests and from current user received_hangout_requests
    //will also create new chat between users (if one doesn't already exist)
    //add users to accepted_hangouts
    const currentUser = await User.findOne({ email: params.currentUserEmail })
    const fromUser = await User.findOne({ email: params.fromUserEmail })
    if (!currentUser || !fromUser) {
      throw new errors.InvalidEmailError()
    } else {
      // check if these users already have a chat
      const existingChat = checkForExistingChat(
        currentUser.chats,
        params.fromUserEmail
      )
      const fromUserLimited = {
        email: params.fromUserEmail,
        first_name: fromUser.first_name,
        profile_photo: fromUser.profile_photo
      }
      const toUserLimited = {
        email: params.currentUserEmail,
        first_name: currentUser.first_name,
        profile_photo: currentUser.profile_photo
      }
      if (existingChat) {
        //still remove hangout request if the users already know each other. just don't create a chat
        await User.updateOne(
          { email: params.fromUserEmail },
          {
            $push: { accepted_hangouts: toUserLimited },
            $pull: { sent_hangout_requests: toUserLimited }
          }
        )
        await User.updateOne(
          { email: params.currentUserEmail },
          {
            $push: { accepted_hangouts: fromUserLimited },
            $pull: { received_hangout_requests: fromUserLimited }
          }
        )
        return existingChat
      } else {
        //create new unique chatId
        const newChat = ++chatId
        //delete hangout request and create new chat for each user
        await User.updateOne(
          { email: params.fromUserEmail },
          {
            $pull: { sent_hangout_requests: toUserLimited },

            $push: {
              chats: {
                chat_id: newChat,
                participants: [
                  {
                    email: currentUser.email,
                    first_name: currentUser.first_name,
                    profile_photo: currentUser.profile_photo
                  }
                ]
              },
              accepted_hangouts: toUserLimited
            }
          }
        )
        const currentUserChat = {
          chat_id: newChat,
          participants: [
            {
              email: fromUser.email,
              first_name: fromUser.first_name,
              profile_photo: fromUser.profile_photo
            }
          ]
        }
        await User.updateOne(
          { email: params.currentUserEmail },
          {
            $pull: { received_hangout_requests: fromUserLimited },
            $push: {
              chats: currentUserChat,
              accepted_hangouts: fromUserLimited
            }
          }
        )
        return currentUserChat
      }
    }
  },

  DeclineHangoutRequest: async params => {
    await User.updateOne(
      { email: params.fromUserEmail },
      {
        $pull: { sent_hangout_requests: { email: params.currentUserEmail } }
      }
    )
    await User.updateOne(
      { email: params.currentUserEmail },
      {
        $pull: { received_hangout_requests: { email: params.fromUserEmail } }
      }
    )
    return `${params.currentUserEmail} has declined ${params.fromUserEmail}'s hangout request.`
  },

  StartHangout: async params => {
    // TO DO will create new hangout and add each user to the other users' ongoing_hangouts array
    //returns autogenerated hangout id
    const hangout = await Hangout.create({
      participants: params.participants,
      status: 'ongoing'
    })
    await User.updateOne(
      { email: params.participants[0].email },
      {
        $push: { ongoing_hangouts: params.participants[1] },
        $pull: { accepted_hangouts: { email: params.participants[1].email } }
      }
    )
    await User.updateOne(
      { email: params.participants[1].email },
      {
        $push: { ongoing_hangouts: params.participants[0] },
        $pull: { accepted_hangouts: { email: params.participants[0].email } }
      }
    )
    return hangout._id
  },

  FinishHangout: async params => {
    // TO DO will change status of hangout to complete, delete each user from the other users' ongoing_hangouts,
    // and add each user to each other users' pending_reviews
  },

  BlockUser: async params => {
    await User.updateOne(
      { email: params.currentUserEmail },
      {
        $push: { blocked_users: params.blockedUserEmail },
        $pull: { chats: { chat_id: params.chatId } }
      }
    )
    await User.updateOne(
      { email: params.blockedUserEmail },
      {
        $push: { blocked_by_users: params.currentUserEmail },
        $pull: { chats: { chat_id: params.chatId } }
      }
    )
    return `${params.currentUserEmail} has blocked ${params.blockedUserEmail}.`
  },

  UnblockUser: async params => {
    await User.updateOne(
      { email: params.currentUserEmail },
      { $pull: { blocked_users: params.blockedUserEmail } }
    )
    await User.updateOne(
      { email: params.blockedUserEmail },
      { $pull: { blocked_by_users: params.currentUserEmail } }
    )
    return `${params.currentUserEmail} has unblocked ${params.blockedUserEmail}.`
  }
}

export = root
