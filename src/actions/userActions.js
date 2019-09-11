import axios from 'axios'
import { apiUrl } from '../../environment.js'
import gql from 'graphql-tag'
import { print } from 'graphql'

const setUserName = username => {
  return {
    type: 'SET_USERNAME',
    username
  }
}

const setActiveView = data => {
  return {
    type: 'SET_ACTIVE_VIEW',
    activeView: data
  }
}

const setAllUsers = data => {
  return {
    type: 'SET_ALL_USERS',
    allUsers: data
  }
}

const setUser = user => {
  return {
    type: 'SET_USER',
    user
  }
}

const toggleAuth = () => {
  return {
    type: 'TOGGLE_AUTH'
  }
}

const toggleResultsView = activeView => {
  return {
    type: 'TOGGLE_RESULTS_VIEW',
    activeView
  }
}

const showProfile = profile => {
  return {
    type: 'SHOW_PROFILE',
    profile
  }
}

const closeProfile = () => {
  return {
    type: 'CLOSE_PROFILE'
  }
}

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

const getEvents = events => {
  return {
    type: 'GET_EVENTS',
    events
  }
}

const showChat = (messages, chatId) => {
  return {
    type: 'SHOW_CHAT',
    messages,
    chatId
  }
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

const showEvent = event => {
  const actionObj = {
    type: 'SHOW_EVENT',
    event
  }
  return actionObj
}

const closeEvent = () => {
  const actionObj = {
    type: 'CLOSE_Event'
  }
  return actionObj
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

export {
  setUserName,
  setActiveView,
  setUser,
  toggleAuth,
  setAllUsers,
  toggleResultsView,
  showProfile,
  closeProfile,
  getChats,
  getEvents,
  showChat,
  postMessage,
  showEvent,
  closeEvent,
<<<<<<< HEAD
  setSocket,
  initializeSocket
=======
  postHangoutRequest,
  postHangoutAccept
>>>>>>> 7fd2be038cac65200881cd4e226018fc02494217
}
