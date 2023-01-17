export const calculateLengthOfStay = (start, end) => {
  let startDate = new Date(start);
  let endDate = new Date(end);
  
  const dateArray = [new Date(startDate.getTime() + ((24) * 60 * 60 * 1000))]

  
  while (startDate < endDate - 1) {
    // set the start date to the next day
    startDate.setDate(startDate.getDate() + 1);
    // push the new date to the array
    dateArray.push(new Date(startDate.getTime() + ((24) * 60 * 60 * 1000)))
  }
  
  let lengthOfStay = dateArray.length - 1;
  
  return lengthOfStay;  
}
