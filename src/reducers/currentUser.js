const defaultUser = {
  id: 2,
  first_name: "John",
  last_name: "Miller",
  email: "john@john.com"
}

export default function currentUser (state = {}, action) {
  console.log("Action type is:", action.type);
  console.log("State is:", state);
  switch(action.type) {
    case 'SET_USER': return action.payload
    default: return state
  }
}
