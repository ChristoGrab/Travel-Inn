import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { loadSpotReviewsThunk } from "../../store/reviews";
import ReviewCard from './ReviewCard'
import "./SpotReviews.css"


function ReviewsBySpot({spotId, currentUser}) {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector(state => Object.values(state.reviews.spot))
  const [userHasReviewed, setUserHasReviewed] = useState(false)
  
  useEffect(() => {
    dispatch(loadSpotReviewsThunk(spotId))
  }, [dispatch, spotId])
  
  useEffect(() => {
    reviews.forEach(review => {
      if (review.User.id === currentUser.id) {
        setUserHasReviewed(true)
      }
    })
  }, [reviews, currentUser.id])
  
  const openCreateReviewForm = (e) => {
    e.preventDefault();
    
    history.push(`/spots/${spotId}/reviews/create`)
  }
  
  let reviewNums = reviews.length;
  let ratingsSum = 0

  for (let i = 0; i < reviews.length; i++) {
  ratingsSum += reviews[i].stars
  }

  // divide sum by reviews and round to 2 decimal places
  let avgRating = (ratingsSum / reviewNums).toFixed(1);

  return (
    <div className="spot-review-container">
      <div className="spot-review-ratings">
        <h2>★ {avgRating} • {reviewNums} Reviews</h2>
      </div>
      
      {
        !userHasReviewed && (
          <button onClick={openCreateReviewForm}>Create a Review</button>
      )}
      
      <div className="spot-review-list">
      {reviews.map(review => (
        <div key={review.id} className="spot-review-detail">
          <ReviewCard review={review}/>
        </div>))}
        </div>
        <div>
      </div>
    </div>
  )
}

export default ReviewsBySpot;
