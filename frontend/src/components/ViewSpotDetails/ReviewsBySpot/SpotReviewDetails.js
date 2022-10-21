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

  console.log("Review in each card: ", review)
  return (
  <div className="spot-review-details">
    <div className="spot-review-overview">
    <span>★ {review.review.stars}</span>
    <span>{review.review.User.firstName}</span>
    </div>
    <p>{review.review.review}</p>
    { user && user.id === review.review.User.id && (
      <button onClick={handleDelete}
      >Delete your Review</button>
    )}
  </div>
  )
}

export default SpotReviewDetails;
