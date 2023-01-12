// Takes in the start and end date and the price per night and returns the total price
// with added tax
export const calculateTotalPrice = (start, end, price) => {
  let startDate = new Date(start);
  let endDate = new Date(end);
  let tax = 1.13
  
  const dateArray = [new Date(startDate.getTime() + ((24) * 60 * 60 * 1000))]
  
  while (startDate < endDate) {
    // set the start date to the next day
    startDate.setDate(startDate.getDate() + 1);
    // push the new date to the array
    dateArray.push(new Date(startDate.getTime() + ((24) * 60 * 60 * 1000)))
  }

  return dateArray.length * price * tax;
}
