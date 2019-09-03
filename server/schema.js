const { buildSchema } = require('graphql')

const schema = buildSchema(`
    scalar DateTime 

    type Stat {
        name: String
        value: Int
    }

    type OtherUser {
        first_name: String
        email: String
    }

    type Chat {
        chat_id: Int
        participants: [OtherUser]
    }

    type UserEvent {
        event_id: Int
        is_creator: Boolean
    }

    type Comment {
        from: OtherUser
        content: String
        timestamp: DateTime
    }

    type User {
        id: String
        first_name: String
        last_name: String
        email: String
        phone_number: String
        password_hash: String
        interests: [String]
        exp: Int
        lvl: Int
        stats: [Stat]
        chats: [Chat]
        events: [UserEvent]
        imei: String
    }

    type Event {
        id: String
        name: String
        description: String
        cover_photo: String
        creator: OtherUser
        start: DateTime
        end: DateTime
        location: String
        limit: Int
        tags: [String]
        attendees: [OtherUser]
        comments: [Comment]
    }

    type Message {
        id: String
        chat_id: Int
        from: OtherUser
        timestamp: DateTime
        content: String
    }

    type Query {
        Users: [User]
        User(email: String!): User
        Events: [Event]
        Event(id: String!): Event
        Messages(chats: [Int]): [Message]
    }
`)

module.exports = schema
