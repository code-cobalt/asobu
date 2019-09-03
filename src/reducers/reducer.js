import { setUserName } from '../actions/userActions'

const initialState = {
  username: ""
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "SET_USERNAME": {
      const copiedState = Object.assign({}, state);
      copiedState.username = action.username
      return copiedState
    }
    default: {
      return state
    }
  }
}

export { reducer, initialState }