import SpotReviewDetails from './SpotReviewDetails'

function ReviewsBySpot({reviews}) {

  // push the reviews for the spot into an array
  const reviewsArray = []
  for (let review in reviews) {
    reviewsArray.push(reviews[review])
  }

  // some good old mod 1 logic to calculate reviews
  let reviewNums = reviewsArray.length;
  let ratingsSum = 0

  for (let i = 0; i < reviewsArray.length; i++) {
  ratingsSum += reviewsArray[i].stars
  }

  // divide sum by reviews and round to 2 decimal places
  let avgRating = (ratingsSum / reviewNums).toFixed(1);

  return (
    <div className="spot-review-container">
      <div className="spot-review-ratings">
        <h2>★ {avgRating} • {reviewNums} Reviews</h2>
      </div>
      <div className="spot-review-list">
      {reviewsArray.map(review => (
        <div key={review.id} className="spot-review-detail">
          <SpotReviewDetails review={review}/>
        </div>))}
        </div>
        <div>
      
      </div>
    </div>

  )

}

export default ReviewsBySpot;
