import { useDispatch } from 'react-redux';
import { deleteBookingThunk } from '../../store/bookings';

const DeleteBooking = ({ bookingId }) => {
  
  const dispatch = useDispatch()
  
  const handleDelete = (e) => { 
    e.preventDefault();
    
    dispatch(deleteBookingThunk(bookingId))
  }
  
  return (
    <button onClick={handleDelete}>Cancel your Booking</button>
  )
}

export default DeleteBooking;
