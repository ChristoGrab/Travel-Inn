const formatDateString = (startDate, endDate) => {
  
  let startDateValues = startDate.split(' ')
  let endDateValues = endDate.split(' ')
  
  let startDay = startDateValues[1]
  let endDay = endDateValues[1]
  let startMonth = startDateValues[0]
  let endMonth = endDateValues[0]
  let startYear = startDateValues[2]
  let endYear = endDateValues[2]
  
  
  
  switch (startDateValues && endDateValues) {
    
    case startMonth === endMonth && startYear === endYear:
      return `${startDateValues[0]} ${startDateValues[1]} - ${endDateValues[1]}, ${startDateValues[2]}`
      
    case startDateValues[0] === endDateValues[0] && startDateValues[2] !== endDateValues[2]:
      return `${startDateValues[0]} ${startDateValues[1]}, ${startDateValues[2]} - ${endDateValues[0] }${endDateValues[1]}, ${endDateValues[2]}`
      
    
    default:
      return `${startDateValues[0]} ${startDateValues[1]}, ${startDateValues[2]} - ${endDateValues[0]} ${endDateValues[1]}, ${endDateValues[2]}`
}
}

let startDate1 = 'Jan 1, 2021'
let endDate1 = 'Jan 2, 2021'

formatDateString(startDate1, endDate1)


