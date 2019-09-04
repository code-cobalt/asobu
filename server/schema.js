const { buildSchema } = require('graphql')

const schema = buildSchema(`
    scalar DateTime 

    type Stat {
        name: String
        value: Int
    }

    type UserLimited {
        first_name: String
        email: String
        profile_photo: String
    }

    type Chat {
        chat_id: Int
        participants: [UserLimited]
    }

    type UserEvent {
        event_id: Int
        is_creator: Boolean
    }

    type Comment {
        from: UserLimited
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
        profile_photo: String
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
        creator: UserLimited
        start: DateTime
        end: DateTime
        location: String
        limit: Int
        tags: [String]
        attendees: [UserLimited]
        comments: [Comment]
    }

    type Message {
        id: String
        chat_id: Int
        from: UserLimited
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

    type Mutation {
        updateImage(input: ImageInput): User
    }

    input ImageInput {
        filename: String,
        base64: String
    }
`)

module.exports = schema
