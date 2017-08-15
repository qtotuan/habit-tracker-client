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

    if (date >= first && date <= last) {
      counter++
    }
  })
  return counter
}

export default function getCompletionRate(dates, target) {
  let num = getNumberCompleted(dates)
  return [Math.floor((num / target) * 100), num]
}
