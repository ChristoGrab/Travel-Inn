import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteReviewThunk } from '../../store/reviews';
import LoadingScreen from '../LoadingScreen';

const DeleteReview = ({ reviewId }) => {
  
  const [userHasHitDelete, setUserHasHitDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const dispatch = useDispatch()
  
  const handleDelete = (e) => { 
    e.preventDefault();
    
    setUserHasHitDelete(true)
  }
  
  const handleConfirm = (e) => {
    e.preventDefault();
    
    setLoading(true)
    
    dispatch(deleteReviewThunk(reviewId))
    .then(() => window.location.reload())
  }
  
  return (
    <>
    { loading && <LoadingScreen /> }
    { userHasHitDelete ? 
      <div className="confirm-delete-div">
        <button className="action-button" onClick={handleConfirm}>Confirm</button>
        <button className="action-button" onClick={() => setUserHasHitDelete(false)}>Abort</button>
      </div> 
      : <button className="action-button" onClick={handleDelete}>Delete your Review</button>
    }
    </>
  )

}

export default DeleteReview;
