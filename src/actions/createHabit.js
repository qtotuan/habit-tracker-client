import fetch from 'isomorphic-fetch';

export default function createHabit(state) {
  let config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
      // 'Authorization': localStorage.getItem('jwt')
    },
    body: JSON.stringify(state)
  }

  // debugger
  return (dispatch) => {
    dispatch({ type: "CREATING_HABIT" });
    return fetch(`http://localhost:3000/api/v1/habits`, config)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: 'UPDATE_HABITS', payload: json.habits })
        console.log("Habit was updated:", json);
      })
  }
}