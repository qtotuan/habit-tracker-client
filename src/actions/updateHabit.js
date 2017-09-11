import fetch from 'isomorphic-fetch';

export default function setCurrentHabit(habit, state) {

  let config = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
      // 'Authorization': localStorage.getItem('jwt')
    },
    body: JSON.stringify(state)
  }

  return (dispatch) => {
    dispatch({ type: "UPDATING_HABITS" });
    return fetch(process.env.REACT_APP_API + `habits/${habit.id}`, config)
      .then(response => response.json())
      .then(json => {
        console.log("In updating_habits", json);
        dispatch({ type: 'UPDATE_HABITS', payload: json })
      })
  }
}
