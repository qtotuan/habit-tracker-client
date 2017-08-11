import fetch from 'isomorphic-fetch';

export default function setCurrentHabit(habit, state) {
  return {type: "SET_CURRENT_HABIT", payload: habit}
}
