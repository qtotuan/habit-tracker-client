import fetch from 'isomorphic-fetch';

export default function fetchHabits() {
  return (dispatch) => {
    dispatch({ type: "FETCHING_HABITS" });
    return fetch('https://sheltered-reef-37337.herokuapp.com/api/v1/habits')
      .then(response => response.json())
      .then(json => dispatch({ type: 'ADD_HABITS', payload: json }))
  }
}
