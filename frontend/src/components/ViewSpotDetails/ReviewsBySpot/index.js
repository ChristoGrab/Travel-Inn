import SpotReviewDetails from './SpotReviewDetails'

function ReviewsBySpot({reviews}) {

  console.log("This is the props in viewReviews: ", reviews)
  
  const reviewsArray = []

  for (let review in reviews) {
    reviewsArray.push(reviews[review])
  }
  
  let reviewNums = reviewsArray.length;
  let avgRating = 0
  
  for (let i = 0; i < reviewsArray.length; i++) {
  avgRating += reviewsArray[i].stars
  }

  avgRating = avgRating/reviewNums

  return (
    <div>
      <div>
        <h2>★ {avgRating} • {reviewNums} Reviews</h2>
      </div>
      <ul>
      {reviewsArray.map(review => (
        <div key={review.id}>
          <SpotReviewDetails review={review}/>
        </div>))}
        </ul>
    </div>
  )

}

export default ReviewsBySpot;
