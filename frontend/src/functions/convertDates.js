// This function takes in a date and converts it to a string
// that is more readable for the user

// the date being passed in is set to the next day
// because a new Date() object is created at 12:00am
// and the date is therefore set to the previous day by default when converted

const convertDates = (date) => {
  const start = new Date(date)
  start.setDate(start.getDate() + 1)
  const startMonth = start.toLocaleString('default', { month: 'short' })
  const startDay = start.getDate()
  const startYear = start.getFullYear()
  const startString = `${startMonth} ${startDay}, ${startYear}`
  return startString
}

export default convertDates;
