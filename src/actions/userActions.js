import axios from 'axios'
import getApiUrl from '../../environment.js'
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
  const userChats = await axios.post(`${getApiUrl()}/graphql`, {
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
  showChat
}
