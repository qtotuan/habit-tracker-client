import fetch from 'isomorphic-fetch';


export function addCategory(category) {

  return {
    type: "ADD_CATEGORY",
    payload: { key: category, text: category, value: category }

  }
}

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
        console.log("GOT ALL THE NEW CATS", categories)
        dispatch({ type: 'ADD_CATEGORIES', payload: categories})
      }) //end .then
  }
}
