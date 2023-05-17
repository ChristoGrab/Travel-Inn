import convertDates from "./convertDates"

// This function takes in two dates and returns a string in the format of:
// "Month Day - Day, Year" if the dates are in the same month and year
// "Month Day - Month Day, Year" if the dates are in the same year
// "Month Day, Year - Month Day, Year" if the dates are in different years
// The function uses the convertDates function to convert the dates into a format that can be parsed
// by the Date constructor. It then splits the parsed dates into an array of values, and uses those
// values to construct the string to be returned.

const formatDateString = (startDate, endDate) => {
  
  let parsedStartDate = convertDates(startDate)
  let parsedEndDate = convertDates(endDate)

  let startDateValues = parsedStartDate.split(' ')
  let endDateValues = parsedEndDate.split(' ')

  let startDay = startDateValues[1].slice(0, -1)
  let endDay = endDateValues[1].slice(0, -1)
  let startMonth = startDateValues[0]
  let endMonth = endDateValues[0]
  let startYear = startDateValues[2]
  let endYear = endDateValues[2]

  if (startMonth === endMonth && startYear === endYear)
    return `${startMonth} ${startDay} - ${endDay}, ${startYear}`
    
  else if (startMonth !== endMonth && startYear === endYear)
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`

  else
    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`
}

export default formatDateString;


