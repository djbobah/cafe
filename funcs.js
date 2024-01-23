function getRandom(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getWorkingDays(month, year) {
  const startDate = new Date(year, month - 1, 1),
    endDate = new Date(year, month - 1, daysInMonth(month, year));
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
  return new Date(year, month, 0).getDate();
}

function chance() {
  return Math.random().toFixed(1);
}
