import {
  setUserName,
  setActiveView,
  setUser,
  toggleAuth,
  toggleResultsView,
  showProfile,
  closeProfile,
  getChats,
  getEvents,
  showChat
} from '../actions/userActions'
<<<<<<< HEAD
=======

>>>>>>> ab25a48d90e94d60afd98a91e0896ac8410d3c6f

const initialState = {
  activeView: 'results',
  resultsSwitch: 'hangouts',
  username: '',
  user: {},
  allUsers: [],
  allEvents: [],
  chats: [],
  showProfile: false,
  currentProfile: {},
<<<<<<< HEAD
  isLoggedIn: false,
  showLogin: true,
  showChat: false,
  currentChat: [],
  currentChatId: ''
=======
  isLoggedIn: true,
  showLogin: true,
  showChat: false,
  currentChat: [],
  currentChatId: ""

>>>>>>> ab25a48d90e94d60afd98a91e0896ac8410d3c6f
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME': {
      const copiedState = Object.assign({}, state)
      copiedState.username = action.username
      return copiedState
    }
    case 'SET_ACTIVE_VIEW': {
      const copiedState = Object.assign({}, state)
      copiedState.activeView = action.activeView
      return copiedState
    }
    case 'SET_ALL_USERS': {
      const copiedState = Object.assign({}, state)
      copiedState.allUsers = action.allUsers
      return copiedState
    }
    case 'SET_USER': {
      const copiedState = Object.assign({}, state)
      copiedState.user = Object.assign({}, action.user)
      copiedState.isLoggedIn = true
      return copiedState
    }
    case 'TOGGLE_AUTH': {
      const copiedState = Object.assign({}, state)
      copiedState.showLogin = !copiedState.showLogin
      return copiedState
    }
    case 'TOGGLE_RESULTS_VIEW': {
      const copiedState = Object.assign({}, state)
      copiedState.resultsSwitch = action.activeView
      return copiedState
    }
    case 'SHOW_PROFILE': {
      const copiedState = Object.assign({}, state)
      copiedState.currentProfile = Object.assign(
        copiedState.currentProfile,
        action.profile
      )
      copiedState.showProfile = true
      return copiedState
    }
    case 'CLOSE_PROFILE': {
      const copiedState = Object.assign({}, state)
      copiedState.currentProfile = Object.assign(copiedState.currentProfile, {})
      copiedState.showProfile = false
      return copiedState
    }
    case 'GET_CHATS': {
      const copiedState = Object.assign({}, state)
      copiedState.chats = [...action.chats]
      return copiedState
    }
<<<<<<< HEAD
    case 'SHOW_CHAT': {
=======
    case "SHOW_CHAT": {
>>>>>>> ab25a48d90e94d60afd98a91e0896ac8410d3c6f
      const copiedState = Object.assign({}, state)
      copiedState.currentChat = [...action.chat]
      copiedState.currentChatId = action.id
      copiedState.showChat = true
      return copiedState
    }
<<<<<<< HEAD
    case 'GET_EVENTS': {
=======
    case "GET_EVENTS": {
>>>>>>> ab25a48d90e94d60afd98a91e0896ac8410d3c6f
      const copiedState = Object.assign({}, state)
      copiedState.allEvents = action.events
      return copiedState
    }
    default: {
      return state
    }
  }
}

export { reducer, initialState }
