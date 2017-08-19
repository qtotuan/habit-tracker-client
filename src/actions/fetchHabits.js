import fetch from 'isomorphic-fetch';

export default function fetchHabits(callback, habitId) {
  let id = habitId
  let func = callback
  return (dispatch) => {
    dispatch({ type: "FETCHING_HABITS" });
    return fetch('http://localhost:3000/api/v1/habits')
      .then(response => response.json())
      .then( json => {
        dispatch({ type: 'ADD_HABITS', payload: json})
        if (id) {
          return json.find(habit => habit.id.toString() === id.toString())
        }
      })
      .then(habit => {
        if (func) {
          func(habit)
        }
      })
  }
}
