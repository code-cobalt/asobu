const [User, Event, Message] = [
  require('./models/user'),
  require('./models/event'),
  require('./models/message')
]
const { GraphQLDateTime } = require('graphql-iso-date')

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
  }
}

module.exports = root
