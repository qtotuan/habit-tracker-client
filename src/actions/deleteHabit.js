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
    return fetch(`https://sheltered-reef-37337.herokuapp.com/api/v1/habits/${habit.id}`, config)
      .then(response => response.json())
      .then(json => dispatch({ type: 'UPDATE_HABITS', payload: json.habits }))
  }
}
