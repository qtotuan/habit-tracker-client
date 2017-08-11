export default function currentHabitReducer (state = {}, action) {
  console.log("Action type is:", action.type);
  console.log("State is:", state);
  switch(action.type) {
    case 'SET_CURRENT_HABIT': {
      return action.payload
    }
    default: return state
  }
}
