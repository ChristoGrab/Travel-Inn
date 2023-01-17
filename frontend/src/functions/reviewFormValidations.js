export const reviewFormValidations = (stars, review) => {
  
  let errors = []
  
  console.log(stars, review)
  
  if (!stars) errors.push('Please provide a rating for your host')
  
  
  if (!review || review.length <= 5) errors.push('Please provide some specific feedback for your host')
  
  if (review.toLowerCase().includes("fuck")
    || review.toLowerCase().includes("shit")) errors.push("Please refrain from using inappropriate language")
  
  return errors;
}
