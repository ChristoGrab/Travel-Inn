// Takes in the start and end date and the price per night and returns the total price
// with added tax
const calculateTotalPrice = (start, end, price) => {
  let startDate = new Date(start);
  let endDate = new Date(end);
  let tax = 1.12;
  let total = 0;
  
  const dateArray = [new Date(startDate.getTime() + ((24) * 60 * 60 * 1000))]
  
  while (startDate < endDate - 1) {
    // set the start date to the next day
    startDate.setDate(startDate.getDate() + 1);
    // push the new date to the array
    dateArray.push(new Date(startDate.getTime() + ((24) * 60 * 60 * 1000)))
  }
  
  // multiply the number of nights by the price per night and add tax
  total = (dateArray.length - 1) * price * tax;

  return total.toFixed(2);
}

