const convertDates = (date) => {
  const start = new Date(date)
  start.setDate(start.getDate() + 1)
  const startMonth = start.toLocaleString('default', { month: 'long' })
  const startDay = start.getDate()
  const startYear = start.getFullYear()
  const startString = `${startMonth} ${startDay}, ${startYear}`
  return startString
}

export default convertDates;
