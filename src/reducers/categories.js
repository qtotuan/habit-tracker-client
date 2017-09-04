export default function categories(state = [], action) {
  switch(action.type) {
    case 'ADD_CATEGORIES': {
      return action.payload
    }

    case 'ADD_CATEGORY': {
      console.log("Add Category state", state)
      console.log("Add Category",action.payload)
      return [...state, action.payload]
    }

    default: return state
  }
}
