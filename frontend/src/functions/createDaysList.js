  // this function takes in a start date and end date and returns an array of dates in between
export const findBookedDates = (start, end) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
    
    const dateArray = [new Date(startDate.getTime() + ((24) * 60 * 60 * 1000))]
    
    while (startDate < endDate) {
      // set the start date to the next day
      startDate.setDate(startDate.getDate() + 1);
      // push the new date to the array
      dateArray.push(new Date(startDate.getTime() + ((24) * 60 * 60 * 1000)))
    }

    return dateArray;
  }
