function SpotReviewDetails(review) {
  
  // console.log("Review in each card: ", review)
  return (
  <div>
    <p>{review.review.User.firstName}</p>
    <p>★ {review.review.stars}</p>
    <p>{review.review.review}</p>
  </div>
  )
}

export default SpotReviewDetails;
