const setUserName = (data) => {
  const actionObj = {
    type: "SET_USERNAME",
    username: data
  }
  return actionObj;
}

export { setUserName };