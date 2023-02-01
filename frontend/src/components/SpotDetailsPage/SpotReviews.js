import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { loadSpotReviewsThunk } from "../../store/reviews";
import ReviewCard from './ReviewCard'
import DeleteReview from './DeleteReview'
import { clearReviews } from "../../store/reviews";
import "./SpotReviews.css"


function ReviewsBySpot({ spotId, spotOwnerId, currentUser, averageRating }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector(state => Object.values(state.reviews.spot))
  const [userOwnsSpot, setUserOwnsSpot] = useState(false)
  const [userReview, setUserReview] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    dispatch(loadSpotReviewsThunk(spotId)).then(setDataLoaded(true))
    
    return (() => dispatch(clearReviews()))
  }, [dispatch, spotId])

  // Function to check if user has left a review
  const checkForUserReview = (reviews) => {

    if (!reviews) return;

    reviews.forEach(review => {
      if (review.userId === currentUser.id) {
        return setUserReview(review)
      }
    })
  }

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
    setUserReview(false)
  }

  const openEditReviewForm = (e) => {
    e.preventDefault();

    history.push(`/spots/${spotId}/reviews/${userReview.id}/edit`)
  }
  
  

  if (!reviews) return null;
  let reviewNums = reviews?.length

  return (
    <div className="spot-review-container">
      <div className="spot-review-ratings">
        {(averageRating !== "NaN" && averageRating > 0) ?
          <h2>★ {averageRating} • {reviewNums} Reviews</h2>
          : <h2>This listing does not have any reviews yet</h2>}

      </div>

      <div className="spot-review-list">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} userHasDeletedReview={userHasDeletedReview} />
        ))}
      </div>
      <div className="spot-page-user-review-container">
        {
          currentUser && !userReview && !userOwnsSpot && (
            <div className="spot-page-user-review-buttons">
              <button className="action-button" onClick={openCreateReviewForm}>Create a Review</button>
            </div>
          )}
        {
          currentUser && userReview && !userOwnsSpot && (
            <div className="spot-page-user-review-buttons">
              <button className="action-button" onClick={openEditReviewForm}>Edit your Review</button>
              <DeleteReview reviewId={userReview.id} />
            </div>
          )}
      </div>
    </div>
  )
}

export default ReviewsBySpot;
