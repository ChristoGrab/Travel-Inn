import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { deleteReviewThunk } from '../../../store/reviews';
import './ReviewsBySpot.css'

function SpotReviewDetails(review) {
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  
  if (!review.review.ReviewImages) return null;
  
  const handleDelete = async (e) => {
    e.preventDefault();
    
    dispatch(deleteReviewThunk(review.review.id))
  }

  return (
  <div className="spot-review-details-box">
    <div className="spot-review-overview">
    <span><i class="fa-solid fa-circle-user"></i> {review.review.User.firstName}</span>
    <span className="spot-review-stars">★ {review.review.stars}</span>
    </div>
    <div className="spot-review-text">{review.review.review}</div>
    { user && user.id === review.review.User.id && (
      <button className="review-delete-button" onClick={handleDelete}
      >Delete your Review</button>
    )}
  </div>
  )
}

export default SpotReviewDetails;
