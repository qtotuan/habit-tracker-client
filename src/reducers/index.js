import { combineReducers } from 'redux'
import habitsReducer from './habits'
import currentHabitReducer from './currentHabit'

export default combineReducers({
  habits: habitsReducer,
  currentHabit: currentHabitReducer
})
