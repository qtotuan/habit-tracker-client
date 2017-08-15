import fetch from 'isomorphic-fetch';

export default function fetchHabits() {
  return (dispatch) => {
    dispatch({ type: "FETCHING_HABITS" });
    return fetch('http://localhost:3000/api/v1/habits')
      .then(response => response.json())
      .then(json => dispatch({ type: 'ADD_HABITS', payload: json }))
  }
}
