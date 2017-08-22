import fetch from 'isomorphic-fetch';

export default function fetchCategories() {
  return (dispatch) => {
    dispatch({ type: "FETCHING_CATEGORIES" });
    return fetch('http://localhost:3000/api/v1/categories')
      .then(response => response.json())
      .then(json => {
        let categories = []
        json.forEach( category => {
          categories.push({
            key: category.name,
            text: category.name[0].toUpperCase() + category.name.substr(1),
            value: category.name
          })
        }) //end for each
        dispatch({ type: 'ADD_CATEGORIES', payload: categories})
      }) //end .then
  }
}
