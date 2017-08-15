import fetch from 'isomorphic-fetch';

export default function setUser(user) {
  return {type: "SET_USER", payload: user}
}
