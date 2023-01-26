import convertDates from "./convertDates"

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


