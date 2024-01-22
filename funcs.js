function getRandom(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getWorkingDays(month, year) {
  // console.log("year", year, "month", month);
  const startDate = new Date(year, month - 1, 1),
    endDate = new Date(year, month - 1, daysInMonth(month, year));
  let result = 0;
  let currentDate = startDate;
  // console.log(currentDate);
  // console.log(endDate);

  while (currentDate <= endDate) {
    let weekDay = currentDate.getDay();
    if (weekDay != 0 && weekDay != 6) result++;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return result;
}

function daysInMonth(month, year) {
  // Use 1 for January, 2 for February, etc.
  return new Date(year, month, 0).getDate();
}
// console.log(daysInMonth(2, 1999));

function chance() {
  return Math.random().toFixed(1);
}
