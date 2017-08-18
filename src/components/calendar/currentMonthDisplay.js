let moment = require('moment');
moment().format();

function addOffset(month) {
  let newMonth = month
  let offset = moment(month[0]).day()
  if (offset === 0) {
    offset = 7
  }
  console.log(offset);
  for (let i = 1; i < offset; i++) {
    newMonth.unshift("")
  }
  return newMonth
}


function displayMonth(month) {
  for (let i = 0; i < month.length/7; i++) {
    let week = []
    for (let j = 0; j < 7; j++) {
      week.push(month[(i * 7) + j])
    }
    console.log(week);
  }
}




let myMonth = ["2017-08-01", "2017-08-02", "2017-08-03", "2017-08-04", "2017-08-05", "2017-08-06", "2017-08-07", "2017-08-08", "2017-08-09", "2017-08-10", "2017-08-11", "2017-08-12", "2017-08-13", "2017-08-14", "2017-08-15", "2017-08-16", "2017-08-17", "2017-08-18", "2017-08-19", "2017-08-20", "2017-08-21", "2017-08-22", "2017-08-23", "2017-08-24", "2017-08-25", "2017-08-26", "2017-08-27", "2017-08-28", "2017-08-29", "2017-08-30", "2017-08-31"]
let monthWithOffset = addOffset(myMonth)
displayMonth(monthWithOffset)
