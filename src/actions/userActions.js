const setUserName = data => {
  const actionObj = {
    type: 'SET_USERNAME',
    username: data
  }
  return actionObj
}

const toggleView = data => {
  const actionObj = {
    type: 'SET_VIEW',
    currentView: data
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

export { setUserName, setActiveView, setUser, toggleAuth, setAllUsers, toggleResultsView, showProfile, closeProfile };
