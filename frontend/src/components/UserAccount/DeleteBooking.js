import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteBookingThunk } from '../../store/bookings';
import "./DeleteBooking.css"

const DeleteBooking = ({ bookingId }) => {
  
  const [userHasHitDelete, setUserHasHitDelete] = useState(false)
  
  const dispatch = useDispatch()
  
  const handleDelete = (e) => { 
    e.preventDefault();
    
    setUserHasHitDelete(true)
  }
  
  const handleConfirm = (e) => {
    e.preventDefault();
    
    dispatch(deleteBookingThunk(bookingId))
  }
  
  return (
    <>
    { userHasHitDelete ? 
      <div className="confirm-delete-div">
        <button className="action-button" onClick={handleConfirm}>Confirm</button>
        <button className="action-button" onClick={() => setUserHasHitDelete(false)}>Go Back</button>
      </div> 
      : <button className="action-button" onClick={handleDelete}>Cancel</button>
    }
    </>
  )

}

export default DeleteBooking;
