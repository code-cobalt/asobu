const initialState = {
  activeView: 'results',
  resultsSwitch: 'hangouts',
  username: '',
  sentHangoutRequests: [],
  receivedHangoutRequests: [],
  user: {
    chats: [
     {
        chat_id: 3,
        participants: [
         {
            email: "jamesp@email.com",
            first_name: "James",
            profile_photo: "https://pm1.narvii.com/6434/94605250171379229064c93049e39ce310551346_hq.jpg",
          },
        ],
      },
    ],
    email: "levans@email.com",
    events: [
     {
        event_id: "1",
        is_creator: false,
      },
    ],
    exp: 23,
    first_name: "Lily",
    id: "5d787e870e58890e0adce07b",
    imei: null,
    interests: [],
    last_name: "Evans",
    lvl: 2,
    phone_number: "+447911654321",
    profile_photo: "https://i.pinimg.com/originals/a6/f4/f0/a6f4f037f9207e4eb4ec5a7cedfd2914.jpg",
    received_hangout_requests: [],
    sent_hangout_requests: [],
  },
  allUsers: [],
  allEvents: [],
  chats: [],
  showProfile: false,
  showEvent: false,
  currentProfile: {},
  currentEvent: {},
  isLoggedIn: true,
  showLogin: true,
  showChat: false,
  currentChatMessages: [],
  currentChatId: 0,
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
      console.log(action.user)
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        chats: action.user.chats,
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
      // remove hangout request from receivedHangoutRequests in store, add new Chat to chats in store if one doesn't already exist, change active view to chats
      const receivedHangoutRequests = state.receivedHangoutRequests.filter(
        request => {
          request.email !== action.fromUserEmail
        }
      )
      let included = false
      for (const chat of state.chats) {
        if (chat.chat_id === action.newChat.chat_id) {
          included = true
        }
      }
      let chats
      if (included) {
        chats = [...state.chats]
      } else {
        chats = [...state.chats, action.newChat]
      }
      return {
        ...state,
        activeView: 'chats',
        receivedHangoutRequests,
        chats
      }
    }
    default: {
      return state
    }
  }
}

export { reducer, initialState }
