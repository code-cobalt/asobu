import { sockethost } from "../../environment"

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
  currentChatId: 0,
  connection: () => {
    const connection = new WebSocket(sockethost)
    const m0 = new RegExp(/m0/)
    connection.onopen = () => {
      console.log('Connection Open')
      state.connection.send(`l0 ${state.user.email}`)
    }
    connection.onerror = error => {
      console.log(error)
    }
    connection.onmessage = e => {
      console.log("INSIDE ONMESSAGE")
      console.log(e.data)
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_SOCKET": {
      // console.log("Reached this point")
      // // connection = new WebSocket(sockethost)
      // const m0 = new RegExp(/m0/)
      // state.connection.onopen = () => {
      //   console.log('Connection Open')
      //   state.connection.send(`l0 ${state.user.email}`)
      // }
      // state.connection.onerror = error => {
      //   console.log(error)
      // }
      // state.connection.onmessage = e => {
      //   console.log("INSIDE ONMESSAGE")
      //   console.log(e.data)
      /* Alert.alert(e.data)
*/
      /* if (m0.test(e.data)) {
        const chat = await axios.post(`${apiUrl}/graphql`, {
          query: `
                    query { Chats(chatIds: [${this.props.chat_id}]) {
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
        })
        this.props.showChat(chat.data.data.Chats.pop().messages, this.props.chat_id)
      } */
      // }

      /* console.log(this.props.socket) */

    }
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
<<<<<<< HEAD
    case 'SET_SOCKET': {
      const copiedState = Object.assign({}, state)
      copiedState.socket = action.socket
      return copiedState
=======
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
>>>>>>> 7fd2be038cac65200881cd4e226018fc02494217
    }
    default: {
      return state
    }
  }
}

export { reducer, initialState }
