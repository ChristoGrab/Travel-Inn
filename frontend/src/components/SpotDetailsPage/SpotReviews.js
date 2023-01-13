import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { loadSpotReviewsThunk } from "../../store/reviews";
import ReviewCard from './ReviewCard'
import "./SpotReviews.css"


function ReviewsBySpot({spotId, spotOwnerId, currentUser, averageRating}) {

  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector(state => Object.values(state.reviews.spot))
  const [userOwnsSpot, setUserOwnsSpot] = useState(false)
  const [userHasReviewed, setUserHasReviewed] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  
  // Function to check if user has left a review
  const checkForUserReview = (reviews) => {
    if (!reviews.length) return
    
    reviews.forEach(review => {
      if (review.User.id === currentUser.id) {
        return setUserHasReviewed(true)
      }
    })
  }
  
  useEffect(() => {
    dispatch(loadSpotReviewsThunk(spotId)).then(setDataLoaded(true))
  }, [dispatch, spotId])
  
  useEffect(() => {
    
    if (currentUser) {
      checkForUserReview(reviews)
    }
  }, [dispatch, reviews, currentUser])
  
  useEffect(() => {
    

  if (currentUser && currentUser.id === spotOwnerId) {
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

  if (!reviews) return null;
  let reviewNums = reviews?.length
  
  return (
    <div className="spot-review-container">
      <div className="spot-review-ratings">
        {(averageRating !== "NaN") ?
        <h2>★ {averageRating} • {reviewNums} Reviews</h2>
        : <h2>Be the first to review this spot!</h2>}

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
