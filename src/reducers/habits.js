export default function habitReducer(state = [], action) {
  console.log("Action type is:", action.type);
  console.log("Payload is:", action.payload);
  console.log("State is:", state);
  switch(action.type) {
    case 'ADD_HABITS': {
      console.log("Adding habits")
      return action.payload
    }
    case 'UPDATE_HABITS': {
      return action.payload
    }
    default: return state
  }
}
