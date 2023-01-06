import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteReviewThunk } from '../../../store/reviews';
import UpdateReviewForm from '../../UpdateReviewForm';
import './ReviewsBySpot.css'

function SpotReviewDetails(review) {
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  
  let updateForm;
  
  if (!review.review.ReviewImages) return null;
  
  const updateReview = (e) => {
    e.preventDefault();
    
    return setShowUpdateForm(true)
  }
  
  const handleDelete = async (e) => {
    e.preventDefault();
    
    dispatch(deleteReviewThunk(review.review.id))
  }
  
  if (showUpdateForm) {
    updateForm = (
      <UpdateReviewForm thisReview={review}/>
    )
  }

  return (
  <div className="spot-review-details-box">
    <div className="spot-review-overview">
    <span><i className="fa-solid fa-circle-user"></i> {review.review.User.firstName}</span>
    <span className="spot-review-stars">★ {review.review.stars}</span>
    </div>
    <div className="spot-review-text">{review.review.review}</div>
    { user && user.id === review.review.User.id && (
      <div className="spot-review-buttons">
        <button className="review-delete-button" onClick={updateReview}>Update your Review</button>
        <button className="review-delete-button" onClick={handleDelete}>Delete your Review</button>
        {updateForm}
      </div>
    )}
  </div>
  )
}

export default SpotReviewDetails;
