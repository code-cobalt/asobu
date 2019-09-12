const initialState = {
  activeView: 'results',
  resultsSwitch: 'hangouts',
  username: '',
  sentHangoutRequests: [],
  receivedHangoutRequests: [],
  user: {
    chats: [
      {
        chat_id: 1,
        participants: [
          {
            email: 'sarabear@email.com',
            first_name: 'Sara',
            profile_photo:
              'data:image/jpeg;base64,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'
          }
        ]
      },
      {
        chat_id: 2,
        participants: [
          {
            email: 'aaronthetires@email.com',
            first_name: 'Aaron',
            profile_photo:
              'https://media.istockphoto.com/photos/happy-laughing-man-picture-id544358212?k=6&m=544358212&s=612x612&w=0&h=odURMNz2hty8LIfpVahaaUKpGU4vd-UlZx4jy-OAnJA='
          }
        ]
      }
    ],
    email: 'jberr@email.com',
    events: [
      {
        event_id: '2',
        is_creator: true
      }
    ],
    exp: 34,
    first_name: 'Jerry',
    id: '5d787e870e58890e0adce078',
    imei: null,
    interests: [],
    last_name: 'Berry',
    lvl: 2,
    phone_number: '+18186662312',
    profile_photo:
      'https://cdn.thedailymash.co.uk/wp-content/uploads/20190324205229/40-something-man-2-1.jpg',
    received_hangout_requests: [],
    sent_hangout_requests: []
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
    case 'CREATE_EVENT': {
      return { ...state, allEvents: [...state.allEvents, action.newEvent] }
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
