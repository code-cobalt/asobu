import { sockethost } from "../../environment"

const initialState = {
  activeView: 'results',
  resultsSwitch: 'hangouts',
  username: '',
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
    case 'SET_SOCKET': {
      const copiedState = Object.assign({}, state)
      copiedState.socket = action.socket
      return copiedState
    }
    default: {
      return state
    }
  }
}

export { reducer, initialState }
