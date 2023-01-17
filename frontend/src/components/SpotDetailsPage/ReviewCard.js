import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteReviewThunk } from '../../store/reviews';
import UpdateReviewForm from '../UpdateReviewForm';
import { Modal } from "../../context/Modal";

function ReviewCard( {review, userHasDeletedReview} ) {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  
  const updateReview = (e) => {
    e.preventDefault();

    history.push(`/reviews/${review.id}/edit`)
  }

  const handleDelete = async (e) => {
    e.preventDefault();

    dispatch(deleteReviewThunk(review.id))
    .then(() => userHasDeletedReview())
  }
  
  let updateForm;
  if (showUpdateForm) updateForm = <UpdateReviewForm review={review} setShowUpdateForm={setShowUpdateForm}/>

  return (
  <>
  <div className="spot-review-details-box">
    <div className="spot-review-overview">
    <span><i className="fa-solid fa-circle-user" /> {review.User?.firstName}</span>
    <span className="spot-review-stars">★ {review?.stars}</span>
    </div>
    <div className="spot-review-text">{review?.review}</div>
  </div>
  {updateForm}
  </>
  )
}

export default ReviewCard;
