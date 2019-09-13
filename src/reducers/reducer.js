const initialState = {
  activeView: 'results',
  resultsSwitch: 'hangouts',
  sentHangoutRequests: [],
  receivedHangoutRequests: [],
  user: {
  //   chats: [
  //    {
  //       chat_id: 3,
  //       participants: [
  //        {
  //           email: "jamesp@email.com",
  //           first_name: "James",
  //           profile_photo: "https://pm1.narvii.com/6434/94605250171379229064c93049e39ce310551346_hq.jpg",
  //         },
  //       ],
  //     },
  //   ],
  //   email: "levans@email.com",
  //   events: [
  //    {
  //       event_id: "1",
  //       is_creator: false,
  //     },
  //   ],
  //   exp: 23,
  //   first_name: "Lily",
  //   id: "5d787e870e58890e0adce07b",
  //   imei: null,
  //   interests: [],
  //   last_name: "Evans",
  //   lvl: 2,
  //   phone_number: "+447911654321",
  //   profile_photo: "https://i.pinimg.com/originals/a6/f4/f0/a6f4f037f9207e4eb4ec5a7cedfd2914.jpg",
  //   received_hangout_requests: [],
  //   sent_hangout_requests: [],
  },
  allUsers: [],
  allEvents: [],
  chats: [],
  showProfile: false,
  showEvent: false,
  showNewEventForm: false,
  showEditEventForm: false,
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
    case 'SET_ACTIVE_VIEW': {
      return { ...state, activeView: action.activeView }
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
      return { ...state, showLogin: !state.showLogin }
    }
    case 'TOGGLE_RESULTS_VIEW': {
      return { ...state, resultsSwitch: action.activeView }
    }
    case 'SHOW_PROFILE': {
      return { ...state, currentProfile: action.profile, showProfile: true }
    }
    case 'CLOSE_PROFILE': {
      return { ...state, currentProfile: {}, showProfile: false }
    }
    case 'SET_CHATS': {
      return { ...state, chats: action.chats }
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
    case 'CREATE_MESSAGE': {
      return {
        ...state,
        currentChatMessages: [...state.currentChatMessages, action.message]
      }
    }
    case 'GET_EVENTS': {
      return { ...state, allEvents: action.events }
    }
    case 'CREATE_EVENT': {
      return { ...state, allEvents: [...state.allEvents, action.newEvent] }
    }
    case 'SHOW_NEW_EVENT_FORM': {
      return { ...state, showNewEventForm: true }
    }
    case 'CLOSE_NEW_EVENT_FORM': {
      return { ...state, showNewEventForm: false }
    }
    case 'SHOW_EDIT_EVENT_FORM': {
      return { ...state, showEditEventForm: true }
    }
    case 'CLOSE_EDIT_EVENT_FORM': {
      return { ...state, showEditEventForm: false }
    }
    case 'UPDATE_EVENT': {
      const allEventsCopy = [...state.allEvents]
      for (let i = 0; i < allEventsCopy.length; i++) {
        if (allEventsCopy[i].id === action.eventId) {
          allEventsCopy[i] === action.updatedEvent
          break
        }
      }
      return {
        ...state,
        allEvents: allEventsCopy,
        currentEvent: action.updatedEvent
      }
    }
    case 'DELETE_EVENT': {
      const filteredEvents = state.allEvents.filter(
        event => event.id !== action.eventId
      )
      const filteredUserEvents = state.user.events.filter(
        event => event.event_id !== action.id
      )
      const updatedUser = { ...state.user, events: filteredUserEvents }
      return {
        ...state,
        allEvents: filteredEvents,
        user: updatedUser,
        resultsSwitch: 'events',
        currentEvent: {},
        showEvent: false
      }
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
      return { ...state, currentEvent: {}, showEvent: false }
    }
    case 'ATTEND_EVENT': {
      //add currentUser to currentevent attendees list
      //add current event to user events list
      const updatedCurrentEvent = {
        ...state.currentEvent,
        attendees: [
          ...state.currentEvent.attendees,
          {
            first_name: state.user.first_name,
            email: state.user.email,
            profile_photo: state.user.profile_photo
          }
        ]
      }
      const updatedUser = {
        ...state.user,
        events: [
          ...state.user.events,
          { event_id: state.currentEvent.id, is_creator: false }
        ]
      }
      return { ...state, currentEvent: updatedCurrentEvent, user: updatedUser }
    }
    case 'UNATTEND_EVENT': {
      //remove currentUser from currentevent attendees list
      //remove current event from user events list
      const updatedAttendees = state.currentEvent.attendees.filter(
        attendee => attendee.email !== state.user.email
      )
      const updatedUserEvents = state.user.events.filter(
        event => event.event_id !== state.currentEvent.id
      )
      const updatedUser = { ...state.user, events: updatedUserEvents }
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          attendees: updatedAttendees
        },
        user: updatedUser
      }
    }
    case 'CREATE_COMMENT': {
      const updatedCurrentEvent = {
        ...state.currentEvent,
        comments: [...state.currentEvent.comments, action.newComment]
      }
      return { ...state, currentEvent: updatedCurrentEvent }
    }
    case 'DELETE_COMMENT': {
      const updatedComments = state.currentEvent.comments.filter(
        comment => comment.id !== action.commentId
      )
      const updatedCurrentEvent = {
        ...state.currentEvent,
        comments: updatedComments
      }
      return { ...state, currentEvent: updatedCurrentEvent }
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
