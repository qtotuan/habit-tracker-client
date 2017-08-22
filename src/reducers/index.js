import { combineReducers } from 'redux'
import habitsReducer from './habits'
import currentHabitReducer from './currentHabit'
import currentUserReducer from './currentUser'
import categoriesReducer from './categories'

export default combineReducers({
  habits: habitsReducer,
  currentHabit: currentHabitReducer,
  currentUser: currentUserReducer,
  categories: categoriesReducer
})
