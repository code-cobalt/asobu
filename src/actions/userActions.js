const setUserName = data => {
  const actionObj = {
    type: 'SET_USERNAME',
    username: data
  }
  return actionObj
}

const setActiveView = data => {
  const actionObj = {
    type: 'SET_ACTIVE_VIEW',
    activeView: data
  }
  return actionObj
}

const setAllUsers = data => {
  const actionObj = {
    type: 'SET_ALL_USERS',
    allUsers: data
  }
  return actionObj
}

const setUser = user => {
  const actionObj = {
    type: "SET_USER",
    user
  }
  return actionObj
}

const toggleAuth = () => {
  const actionObj = {
    type: "TOGGLE_AUTH"
  }
  return actionObj
}

const toggleResultsView = activeView => {
  const actionObj = {
    type: "TOGGLE_RESULTS_VIEW",
    activeView
  }
  return actionObj
}

const showProfile = profile => {
  const actionObj = {
    type: "SHOW_PROFILE",
    profile
  }
  return actionObj
}

const closeProfile = () => {
  const actionObj = {
    type: "CLOSE_PROFILE"
  }
  return actionObj
}

const getChats = chats => {
  const actionObj = {
    type: "GET_CHATS",
    chats
  }
  return actionObj
}

const getEvents = events => {
  const actionObj = {
    type: "GET_EVENTS",
    events
  }
  return actionObj
}

const showChat = (chat, id) => {
  const actionObj = {
    type: "SHOW_CHAT",
    chat,
    id
  }
  return actionObj
}

const showEvent = event => {
  const actionObj = {
    type: "SHOW_EVENT",
    event
  }
  return actionObj
}

const closeEvent = () => {
  const actionObj = {
    type: "CLOSE_Event"
  }
  return actionObj
}

const setSocket = socket => {
  const actionObj = {
    type: "SET_SOCKET",
    socket
  }
  return actionObj
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
  showEvent,
  closeEvent,
  setSocket
};
