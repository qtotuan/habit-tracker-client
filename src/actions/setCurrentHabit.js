import fetch from 'isomorphic-fetch';

export default function setCurrentHabit(habit) {
  return {type: "SET_CURRENT_HABIT", payload: habit}
}
