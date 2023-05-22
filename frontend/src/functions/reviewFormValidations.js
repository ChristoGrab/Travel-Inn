// This function is used to validate the review form. It checks if the user has provided a rating and a review.
// It also checks if the review contains any inappropriate language.
// If any of these conditions are not met, the function returns an array of errors.
// If all conditions are met, the function returns an empty array.

export const reviewFormValidations = (stars, review) => {

  let errors = []
  
  if (!stars) errors.push('Please provide a rating for your host')
  
  
  if (!review || review.length <= 5) errors.push('Please provide some specific feedback for your host')
  
  if (review.toLowerCase().includes("fuck")
    || review.toLowerCase().includes("shit")) errors.push("Please refrain from using inappropriate language")
  
  return errors;
}
