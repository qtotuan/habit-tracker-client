import getCompletionRate from '../habits/habitCompletionRateFlexible'

var moment = require('moment')
moment().format()


export default function getData(dates, target) {

  dates.sort()
  let myDate = moment(dates[0])
  let end = moment(dates[dates.length - 1])
  let result = []

  while (myDate <= end) {
    console.log("Counter beginnign", myDate);

    let completionRate = getCompletionRate(dates, target, myDate)[0]
    console.log(myDate, completionRate);
    result.push({
      name: myDate.format("MM-DD"),
      completionRate: completionRate,
    })
    myDate.add(7, 'days')
  }
  console.log(result);
  console.log(dates);

}


let myDates = ["2017-08-04", "2017-08-05", "2017-08-11", "2017-08-21", "2017-08-13", "2017-08-17", "2017-08-02", "2017-08-03", "2017-10-30", "2017-09-19", "2017-09-12", "2017-08-19", "2017-08-18", "2017-08-16", "2017-08-15"]


getData(myDates, 6)













//
//
//
// function getCompletionRate(dates, target, currentDay) {
//
//   function getFirstAndLastDayOfWeek() {
//     let curr = currentDay || moment()
//     let first = curr.date() - curr.day() + 1
//     let firstDate = moment(curr.date(first)).hours(0).minute(0).second(0).milliseconds(0)
//     let lastDate = firstDate.clone().add(6, 'days')
//     return [firstDate, lastDate]
//   }
//
//   function getNumberCompleted(dates) {
//     let counter = 0
//     let first = getFirstAndLastDayOfWeek()[0]
//     let last = getFirstAndLastDayOfWeek()[1]
//
//     dates.forEach( date => {
//       date = moment(date)
//
//       if (date >= first && date <= last) {
//         counter++
//       }
//     })
//     return counter
//   }
//
//   function result(dates, target) {
//     let num = getNumberCompleted(dates)
//     return [Math.floor((num / target) * 100), num]
//   }
//
//   return result(dates, target)
//
// }
