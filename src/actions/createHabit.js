import fetch from 'isomorphic-fetch';
import fetchCategories, { addCategory } from './fetchCategories'


export default function createHabit(state) {
  let config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
      // 'Authorization': localStorage.getItem('jwt')
    },
    body: JSON.stringify({habit:state,user_email:localStorage.getItem("email")})
  }

  console.log("CREATING HABIT ACTION",state.newCategory)


  return (dispatch) => {
    dispatch(addCategory(state.newCategory))
    dispatch({ type: "CREATING_HABIT" });
    return fetch(process.env.REACT_APP_API + 'habits', config)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'UPDATE_HABITS', payload: json
         })
        console.log("Habit was updated:", json);
      })
  }
}
