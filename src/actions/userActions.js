const setUserName = data => {
  const actionObj = {
    type: "SET_USERNAME",
    username: data
  }
  return actionObj;
}

const toggleView = data => {
  const actionObj = {
    type: "SET_VIEW",
    currentView: data
  }
  return actionObj;
}

const setActiveView = data => {
  const actionObj = {
    type: "SET_ACTIVE_VIEW",
    activeView: data
  }
}

const setAllUsers = data => {
  const actionObj = {
    type: "SET_ALL_USERS",
    allUsers: data
  }
}

export { setUserName, setActiveView };