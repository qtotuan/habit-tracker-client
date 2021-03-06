import getCompletionRate from '../habits/habitCompletionRateFlexible'

var moment = require('moment')
moment().format()

export default function getData(dates = [], target) {
  dates.sort()
  let myDate = moment(dates[0])
  let end = moment(dates[dates.length - 1])
  let result = []

  while (myDate <= end) {
    let completionRate = getCompletionRate(dates, target, myDate)[0]
    result.push({
      name: myDate.format("MM-DD"),
      completionRate: completionRate,
    })
    myDate.add(7, 'days')
  }
  return result
}

// let myDates = ["2017-08-04", "2017-08-05", "2017-08-11", "2017-08-21", "2017-08-13", "2017-08-17", "2017-08-02", "2017-08-03", "2017-10-30", "2017-09-19", "2017-09-12", "2017-08-19", "2017-08-18", "2017-08-16", "2017-08-15"]
// getData(myDates, 6)
