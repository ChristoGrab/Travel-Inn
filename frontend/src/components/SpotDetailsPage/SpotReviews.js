import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { loadSpotReviewsThunk } from "../../store/reviews";
import ReviewCard from './ReviewCard'
import "./SpotReviews.css"


function ReviewsBySpot({spotId, spotOwnerId, currentUser}) {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector(state => Object.values(state.reviews.spot))
  const [userOwnsSpot, setUserOwnsSpot] = useState(false)
  const [userHasReviewed, setUserHasReviewed] = useState(false)
  
  useEffect(() => {
    dispatch(loadSpotReviewsThunk(spotId))
  }, [dispatch, spotId])
  
  
  useEffect(() => {
    
    if (!currentUser) {
      return;
    }
    
    try {
    reviews.forEach(review => {
      if (review.User.id === currentUser.id) {
        setUserHasReviewed(true)
      }
    })
  } catch (e) {
    window.location.reload()
  }
  }, [reviews, currentUser])
  
  useEffect(() => {
    
    if (!currentUser) {
      return;
    }
    
    if (currentUser.id === spotOwnerId) {
      setUserOwnsSpot(true)
    }
  }, [currentUser, spotOwnerId])
  
  
  const openCreateReviewForm = (e) => {
    e.preventDefault();
    
    history.push(`/spots/${spotId}/reviews/create`)
  }
  
  const userHasDeletedReview = () => {
    setUserHasReviewed(false)
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
        currentUser && !userHasReviewed && !userOwnsSpot && (
          <button onClick={openCreateReviewForm}>Create a Review</button>
      )}
      
      <div className="spot-review-list">
      {reviews.map(review => (
          <ReviewCard key={review.id} review={review} userHasDeletedReview={userHasDeletedReview}/>
      ))}
        </div>
        <div>
      </div>
    </div>
  )
}

export default ReviewsBySpot;
