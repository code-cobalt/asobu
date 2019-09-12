import axios from 'axios'
import { apiUrl } from '../../environment.js'
import gql from 'graphql-tag'
import { print } from 'graphql'

const getChats = async userEmail => {
  const userChatsQuery = gql`
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
  const userChats = await axios.post(`${apiUrl}/graphql`, {
    query: print(userChatsQuery),
    variables: {
      userEmail
    }
  })
  return userChats.data.data.User.chats
}

const postMessage = async message => {
  const createMessageMutation = gql`
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
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(createMessageMutation),
    variables: {
      message
    }
  })
  return res.data.data.CreateMessage
}

const postHangoutRequest = async (currentUserEmail, toUserEmail) => {
  const sendHangoutRequestMutation = gql`
    mutation SendHangoutRequest(
      $currentUserEmail: String!
      $toUserEmail: String!
    ) {
      SendHangoutRequest(
        currentUserEmail: $currentUserEmail
        toUserEmail: $toUserEmail
      )
    }
  `
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(sendHangoutRequestMutation),
    variables: {
      currentUserEmail,
      toUserEmail
    }
  })
  return res.status
}

const postHangoutAccept = async (currentUserEmail, fromUserEmail) => {
  const acceptHangoutRequestMutation = gql`
    mutation AcceptHangoutRequest(
      $currentUserEmail: String!
      $fromUserEmail: String!
    ) {
      AcceptHangoutRequest(
        currentUserEmail: $currentUserEmail
        fromUserEmail: $fromUserEmail
      ) {
        chat_id
        participants {
          first_name
          email
          profile_photo
        }
      }
    }
  `
  const res = await axios.post(`${apiUrl}/graphql`, {
    query: print(acceptHangoutRequestMutation),
    variables: {
      currentUserEmail,
      fromUserEmail
    }
  })
  return res
}

export { getChats, postMessage, postHangoutRequest, postHangoutAccept }
