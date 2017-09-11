import fetch from 'isomorphic-fetch';

export default function setCurrentHabit(habit) {

  let config = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
      // 'Authorization': localStorage.getItem('jwt')
    },
    body: JSON.stringify(habit)
  }

  return (dispatch) => {
    dispatch({ type: "DELETING_HABIT" });
    return fetch(process.env.REACT_APP_API + `habits/${habit.id}`, config)
      .then(response => response.json())
      .then(json => dispatch({ type: 'UPDATE_HABITS', payload: json }))
  }
}
