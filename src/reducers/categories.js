export default function categories(state = [], action) {
  switch(action.type) {
    case 'ADD_CATEGORIES': {
      // debugger
      return action.payload
    }
    default: return state
  }
}
