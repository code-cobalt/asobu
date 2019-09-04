const setUserName = (data) => {
  const actionObj = {
    type: "SET_USERNAME",
    username: data
  }
  return actionObj;
}

const toggleView = (data) => {
  const actionObj = {
    type: "SET_VIEW",
    currentView: data
  }
  return actionObj;
}

export { setUserName };