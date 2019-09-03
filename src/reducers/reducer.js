import { setUserName } from '../actions/userActions'

const initialState = {
  username: "",
  activeUsers: ["Mark", "Matt", "TJ", "Brittany"],
  activeEvents: ["Soccer", "Climbing", "Music", "Programming"],
  currentView: "meets"
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
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
    default: {
      return state
    }
  }
}

export { reducer, initialState }