import gql from 'graphql-tag'

export const getChatQuery = gql`
  query Chat($chatId: Int!) {
    Chat(chatId: $chatId) {
      messages {
        id
        content
        timestamp
        from {
          first_name
          profile_photo
          email
        }
      }
    }
  }
`

export const getUserChatsQuery = gql`
  query User($userEmail: String!) {
    User(userEmail: $userEmail) {
      chats {
        chat_id
        participants {
          first_name
          email
          profile_photo
        }
      }
    }
  }
`

export const createMessageQuery = gql`
  mutation CreateMessage($message: NewMessage!) {
    CreateMessage(newMessage: $message) {
      id
      chat_id
      from {
        first_name
        email
        profile_photo
      }
      timestamp
      content
    }
  }
`
