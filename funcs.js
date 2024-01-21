function getRandom(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getWorkingDays(
  startDate = new Date(2023, 01, 01),
  endDate = new Date(2023, 12, 31)
) {
  let result = 0;
  let currentDate = startDate;
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
