import { useDispatch } from 'react-redux';
import { deleteBookingThunk } from '../../store/bookings';

const DeleteBooking = ({ bookingId }) => {
  
  const dispatch = useDispatch()
  
  const handleDelete = (e) => { 
    e.preventDefault();
    
    dispatch(deleteBookingThunk(bookingId))
  }
  
  return (
    <button className="action-button" onClick={handleDelete}>Cancel Reservation</button>
  )
}

export default DeleteBooking;
