const [User, Event, Message] = [
  require("./models/user"),
  require("./models/event"),
  require("./models/message")
];
const { GraphQLDateTime } = require("graphql-iso-date");

const root = {
  DateTime: GraphQLDateTime,

  Users: () => {
    return User.find();
  },

  User: async email => {
    return await User.findOne(email);
  },

  Events: args => {
    return Event.find();
  },

  Event: async args => {
    return await Event.findById(args.id);
  },

  Messages: async chats => {
    const ids = [];
    for (const chat_id of chats.chats) {
      ids.push({ chat_id });
    }
    return await Message.find({ $or: ids });
  }
};

module.exports = root;
