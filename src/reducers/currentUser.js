export default function currentUser (state = {}, action) {
  console.log("Action type is:", action.type);
  console.log("State is:", state);
  switch(action.type) {
    case 'SET_USER': {
      return action.payload
    }
    case 'CLEAR_USER': {
      return action.payload
    }
    default: {
      return state
    }
  }
}
