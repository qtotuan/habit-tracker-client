var moment = require('moment');
moment().format();


function getFirstAndLastDayOfWeek() {
  let curr = moment()
  let first = curr.date() - curr.day() + 1
  let firstDate = moment(curr.date(first)).hours(0).minute(0).second(0).milliseconds(0)
  let lastDate = firstDate.clone().add(6, 'days')
  return [firstDate, lastDate]
}


function getNumberCompleted(dates) {
  let counter = 0
  let first = getFirstAndLastDayOfWeek()[0]
  let last = getFirstAndLastDayOfWeek()[1]

  dates.forEach( date => {
    date = moment(date)
    // console.log("Date is: ", date);
    // console.log("First is: ", first);

    if (date >= first && date <= last) {
      // console.log("Increase count!!!");
      // console.log("");
      counter++
    }
  })
  return counter
}

export default function getCompletionRate(dates, target) {
  let num = getNumberCompleted(dates)
  return [Math.floor((num / target) * 100), num]
}


// let completedDates = ["2017-08-10","2017-08-13","2017-08-14","2017-08-18","2017-08-17","2017-08-15","2017-08-20", "2017-08-21" ]

// let numberCompletedThisWeek = getNumberCompleted(completedDates)
// console.log("This week completed number:", numberCompletedThisWeek)
// console.log(getFirstAndLastDayOfWeek());
// console.log("Completion rate is:", getCompletionRate(completedDates));
