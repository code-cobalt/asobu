const initialState = {
  activeView: 'results',
  resultsSwitch: 'hangouts',
  username: '',
  sentHangoutRequests: [],
  receivedHangoutRequests: [],
  user: {},
  allUsers: [],
  allEvents: [],
  chats: [],
  showProfile: false,
  showEvent: false,
  currentProfile: {},
  currentEvent: {},
  isLoggedIn: false,
  showLogin: true,
  showChat: false,
  currentChatMessages: [],
  currentChatId: 0
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
      copiedState.allUsers = action.allUsers.filter(
        user => user.email !== state.user.email
      )
      return copiedState
    }
    case 'SET_USER': {
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        sentHangoutRequests: action.user.sent_hangout_requests,
        receivedHangoutRequests: action.user.received_hangout_requests
      }
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
      return { ...state, currentProfile: action.profile, showProfile: true }
    }
    case 'CLOSE_PROFILE': {
      const copiedState = Object.assign({}, state)
      copiedState.currentProfile = {}
      copiedState.showProfile = false
      return copiedState
    }
    case 'SET_CHATS': {
      const copiedState = Object.assign({}, state)
      copiedState.chats = [...action.chats]
      return copiedState
    }
    case 'SHOW_CHAT': {
      return {
        ...state,
        currentChatMessages: [...action.messages],
        currentChatId: action.chatId,
        showChat: true
      }
    }
    case 'CLOSE_CHAT': {
      return { ...state, showChat: false }
    }
    case 'GET_EVENTS': {
      const copiedState = Object.assign({}, state)
      copiedState.allEvents = action.events
      return copiedState
    }
    case 'CREATE_MESSAGE': {
      const copiedState = Object.assign({}, state)
      copiedState.currentChatMessages = [
        ...state.currentChatMessages,
        action.message
      ]
      return copiedState
    }
    case 'SHOW_EVENT': {
      const copiedState = Object.assign({}, state)
      copiedState.currentEvent = Object.assign(
        copiedState.currentEvent,
        action.event
      )
      copiedState.showEvent = true
      return copiedState
    }
    case 'CLOSE_EVENT': {
      const copiedState = Object.assign({}, state)
      copiedState.currentEvent = {}
      copiedState.showEvent = false
      return copiedState
    }
    case 'SEND_REQUEST': {
      return {
        ...state,
        sentHangoutRequests: [...state.sentHangoutRequests, action.toUser]
      }
    }
    case 'ACCEPT_REQUEST': {
    }
    default: {
      return state
    }
  }
}

export { reducer, initialState }
