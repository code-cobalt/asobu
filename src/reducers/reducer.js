import { setUserName, setActiveView, setUser, toggleAuth, toggleResultsView, showProfile, closeProfile } from '../actions/userActions'

const initialState = {
  username: "",
  activeEvents: ["Soccer", "Climbing", "Music", "Programming"],
  activeView: "results",
  showLogin: true,
  allUsers: [],
  isLoggedIn: true,
  user: {},
  resultsSwitch: 'hangouts',
  showProfile: false,
  currentProfile: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "SET_USERNAME": {
      const copiedState = Object.assign({}, state);
      copiedState.username = action.username
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
    case "SET_USER": {
      const copiedState = Object.assign({}, state)
      copiedState.user = Object.assign({}, action.user)
      return copiedState
    }
    case "TOGGLE_AUTH": {
      const copiedState = Object.assign({}, state)
      copiedState.showLogin = !copiedState.showLogin
      return copiedState
    }
    case "TOGGLE_RESULTS_VIEW": {
      const copiedState = Object.assign({}, state)
      copiedState.resultsSwitch = action.activeView
      return copiedState
    }
    case "SHOW_PROFILE": {
      const copiedState = Object.assign({}, state)
      copiedState.currentProfile = Object.assign(copiedState.currentProfile, action.profile)
      copiedState.showProfile = true
      return copiedState
    }
    case "CLOSE_PROFILE": {
      const copiedState = Object.assign({}, state)
      copiedState.currentProfile = Object.assign(copiedState.currentProfile, {})
      copiedState.showProfile = false
      return copiedState
    }
    default: {
      return state
    }
  }
}

export { reducer, initialState }