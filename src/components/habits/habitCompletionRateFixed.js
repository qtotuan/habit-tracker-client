let moment = require('moment')
moment().format();


const library = {
  "Sunday": 0,
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturda": 6,
}

// Convert the user's choice ["Monday", "Wednesday", "Friday"] to Javascript Date numbers [1, 3, 5]
function convertWeekdays(arr) {
  return arr.map( day => {
    return library[day]
  })
}

// Calculate dates where the habit should have been completed, from when it was created until yesterday
function getDueDates(weekdaysArr, creationDate) {
  let weekdays = convertWeekdays(weekdaysArr) // [1, 3, 5]
  let dueDates = [] // store results here

  let year = parseInt(creationDate.split("-")[0])
  let month = parseInt(creationDate.split("-")[1]) - 1
  let day = parseInt(creationDate.split("-")[2])

  // Loop through every single day from creation to yesterday and check if it was a Mon, Wed, or Fri
  // While the current date in the loop is still before today
  while (new Date(year, month, day) < new Date()) {

    // Is the current Date a Monday, Wednesday, or Friday?
    if (weekdays.includes(new Date(year, month, day).getDay())) {
      // If yes, add to the dueDates
      dueDates.push(new Date(year, month, day))
    }

    day++
  }
  return dueDates
}

// new Date(day.setDate(day.getDate() + 1))

// Compare the user's dates_completed with dueDates, they only count when they overlap
function getCompletedDates(dueDates, dates_completed) {

  let dates_completed_ISO = dates_completed.map( dateString => {
    return new Date(dateString)
  })
  console.log("dates_completed_ISO", dates_completed_ISO);

  return dueDates.filter( dueDate => {
    console.log("dueDate is now:", dueDate)
    // console.log(dates_completed_ISO.includes(moment(dueDate)))
    return dates_completed_ISO.includes(dueDate)
  })
}

function completionRate(dueDates, completedDates) {
  return dueDates / completedDates
}


const dates_completed = [
"2017-08-01",
"2017-08-07",
"2017-08-04",
"2017-08-14",
]
const myWeekdays = ["Monday", "Wednesday", "Friday"]
const myCreationDate = "2017-08-01"

let myDueDates = getDueDates(myWeekdays, myCreationDate)
let myCompletedDates = getCompletedDates(myDueDates, dates_completed)
console.log("dueDates are", myDueDates);
console.log("completedDates are", myCompletedDates);
// console.log("Moment now is", moment("2017-08-04"));
// console.log("Moment now is", moment("2017-08-04T04:00:00.000Z"));
// console.log("Moment is: ", moment([2017, 7, 1]));
