const defaultUser = {
  id: 1,
  first_name: "Susan",
  last_name: "Smith",
  email: "susan@susan.com"
}

export default function currentUser (state = defaultUser, action) {
  console.log("Action type is:", action.type);
  console.log("State is:", state);
  switch(action.type) {
    default: return state
  }
}
