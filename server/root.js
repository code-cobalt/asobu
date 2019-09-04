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

  Messages: async chats => {
    const res = await Message.aggregate(
      [
        { $match: { chat_id: { $in: chats.chats } } },
        {
          $group: {
            _id: '$chat_id',
            messages: { $push: { content: '$content' } }
          }
        }
      ],
      (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
        }
      }
    )
    return res
  }
}

module.exports = root
