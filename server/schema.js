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

    type UserChat {
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
        chats: [UserChat]
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
        from: UserLimited
        timestamp: DateTime
        content: String
    }

    type Chat {
        _id: Int,
        messages: [Message]
    }

    type Query {
        Users: [User]
        User(email: String!): User
        Events: [Event]
        Event(id: String!): Event
        Chats(ids: [Int]): [Chat]
    }


    input NewEvent {
        name: String!
        description: String!
        cover_photo: String
        creator: UserLimited!
        start: DateTime!
        end: DateTime!
        location: String!
        limit: Int
        tags: [String]
    }

    input UpdatedEvent {
        name: String
        description: String
        cover_photo: String
        start: DateTime
        end: DateTime
        location: String
        limit: Int
        tags: [String]
        attendees: [UserLimited]
        comments: [Comment]
    }

    input NewUser {
        first_name: String!
        last_name: String!
        email: String!
        phone_number: String!
        password_hash: String!
        interests: [String]
        exp: Int
        lvl: Int
        stats: [Stat]
        imei: String
    }

    input UpdatedUser {
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
        chats: [UserChat]
        events: [UserEvent]
        imei: String
    }

    input Message {
        id: String!
        from: UserLimited!
        timestamp: DateTime!
        content: String!
    }

    type Mutation {
        CreateEvent(newEvent: NewEvent): Event
        UpdateEvent(updatedEvent: UpdatedEvent): Event
        DeleteEvent(eventId: String): String
        CreateUser(newUser: NewUser): User
        UpdateUser(updatedUser: UpdatedUser): User
        DeleteUser(userId: String): String
        CreateMessage(newMessage: Message): Message
    }
`)

module.exports = schema
