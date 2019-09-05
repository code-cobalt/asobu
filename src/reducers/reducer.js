import { setUserName, setActiveView } from '../actions/userActions'

const initialState = {
  username: "",
  activeUsers: ["Mark", "Matt", "TJ", "Brittany"],
  activeEvents: ["Soccer", "Climbing", "Music", "Programming"],
  activeView: "meets",
  allUsers: [],
  isLoggedIn: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERNAME": {
      const copiedState = Object.assign({}, state);
      copiedState.username = action.username
      return copiedState
    }
    case "SET_VIEW": {
      const copiedState = Object.assign({}, state);
      copiedState.currentView = action.currentView
      return copiedState
    }
    case "SET_ACTIVE_VIEW": {
      const copiedState = Object.assign({}, state);
      copiedState.activeView = action.activeView;
      return copiedState
    }
    case "SET_ALL_USERS": {
      const copiedState = Object.assign({}, state);
      copiedState.allUsers = action.allUsers;
      return copiedState
    }
    default: {
      return state
    }
  }
}

export { reducer, initialState }