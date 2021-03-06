import fetch from 'isomorphic-fetch';

export default function fetchHabits(callback, habitId, callback2) {
  let id = habitId
  let func = callback
  let func2 = callback2
  return (dispatch) => {
    dispatch({ type: "FETCHING_HABITS" });
    return fetch(process.env.REACT_APP_API + 'habits')
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
        if (func2) {
          // dispatch()
          //
          callback2()
        }
      })
  }
}
