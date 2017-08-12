import { combineReducers } from 'redux'
import habitsReducer from './habits'
import currentHabitReducer from './currentHabit'
import currentUserReducer from './currentUser'

export default combineReducers({
  habits: habitsReducer,
  currentHabit: currentHabitReducer,
  currentUser: currentUserReducer
})
