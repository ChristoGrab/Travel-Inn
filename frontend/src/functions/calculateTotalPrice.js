// Takes in the start and end date and the price per night and returns the total price
// with added tax
export const calculateTotalPrice = (nights, price) => {
  
  let tax = 1.12;
  let total = 0;
  
  // multiply the number of nights by the price per night and add tax
  total = nights * price * tax;

  console.log("Total price calculation: ", total)
  return total.toFixed(2);  
}

