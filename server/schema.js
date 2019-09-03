const { buildSchema } = require("graphql")

const schema = buildSchema(`
    type Stat {
        name: String
        value: Int
    }

    type Participant {
        first_name: String
        email: String
    }

    type Chat {
        chat_id: Int
        participants: [Participant]
    }

    type UserEvent {
        event_id: Int
        is_creator: Boolean
    }

    type User {
        id: String
        first_name: String
        last_name: String
        email: String
        phone_number: String
        password_hash: String
        interests: [String]
        hobbies: [String]
        exp: Int
        level: Int
        stats: [Stat]
        chats: [Chat]
        events: [UserEvent]
        imei: String
    }

    type Query {
        Users: [User]
        User(email: String!): User
    }
`)

module.exports = schema