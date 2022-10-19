import SpotReviewDetails from './SpotReviewDetails'

function ReviewsBySpot({reviews}) {

  // push the reviews for the spot into an array
  const reviewsArray = []
  for (let review in reviews) {
    reviewsArray.push(reviews[review])
  }

  // some good old mod 1 logic to calculate reviews
  let reviewNums = reviewsArray.length;
  let avgRating = 0

  for (let i = 0; i < reviewsArray.length; i++) {
  avgRating += reviewsArray[i].stars
  }

  avgRating = avgRating / reviewNums

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
