export default function habitReducer(state = [], action) {
  console.log("Action type is:", action.type);
  console.log("Payload is:", action.payload);
  console.log("State is:", state);
  switch(action.type) {
    case 'ADD_HABITS': {
      console.log("Payload 2 is:", action.payload);
      return action.payload
    }
    default: return state
  }
}
