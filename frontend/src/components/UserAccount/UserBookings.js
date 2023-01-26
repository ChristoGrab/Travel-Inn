import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookingsThunk, clearBookingsAction } from '../../store/bookings';
import DeleteBooking from './DeleteBooking';
import convertDates from '../../functions/convertDates';
import './UserBookings.css'

const UserBookings = () => {

  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();
  const userBookings = useSelector(state => Object.values(state.bookings.userBookings))
  let upcomingBookings = [];
  let pastBookings = [];
  const [dataLoaded, setDataLoaded] = useState(false)
  
  upcomingBookings = userBookings.filter(booking => {
    return booking.startDate > new Date().toISOString().split('T')[0]
  })

  pastBookings = userBookings.filter(booking => {
    return booking.startDate <= new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    dispatch(getUserBookingsThunk())
    .then(setDataLoaded(true))

    return (() => dispatch(clearBookingsAction()))
  }, [dispatch])

  const openReservationBox = (e, bookingId, spotId) => {
    e.preventDefault();

    history.push(`/bookings/${spotId}/update/${bookingId}`)
  }

    if (!user) return null;
  
    return (
      <>
      { dataLoaded && (
      <div className="user-bookings-page">

        <div className="user-bookings-header">
          <h1>Trips</h1>
          <h2>Upcoming reservations</h2>
        </div>
        <div className="upcoming-bookings-container">
          {upcomingBookings.length ? upcomingBookings?.map(booking => (
            <div key={booking.id} className="upcoming-booking-card">
              <Link to='/' className='upcoming-booking-box-1'>
                <div className="upcoming-booking-name">
                  <span className="bold big-text">{booking.Spot.city}</span>
                  <span>{booking.Spot.name}</span>
                </div>
                <div className="upcoming-booking-dates">
                  <span>{convertDates(booking.startDate)}</span>
                  <span>{convertDates(booking.endDate)}</span>
                </div>
                <div className="upcoming-booking-place">
                  <div>{booking.Spot.address}</div>
                  <div>{booking.Spot.country}</div>
                </div>
              </Link>
              
              <Link to={`/spots/${booking.spotId}`} className="upcoming-booking-box-2">
                <img className="medium-image" 
                src={booking.Spot.previewImage}
                alt={booking.Spot.name} />
              </Link>
              
              <div className="upcoming-booking-box-3">
                <button
                  className="action-button"
                  onClick={(e) => openReservationBox(e, booking.id, booking.spotId)}
                >Change Reservation</button>
                <DeleteBooking bookingId={booking.id} />
              </div>
            </div>
          ))
            : <h3>You don't have any upcoming reservations</h3>}
        </div>

        <h2>Where you've been</h2>
        <div className="previous-bookings-container">
          {pastBookings.length ? pastBookings?.map(booking => (
            <Link to={`/spots/${booking.Spot.id}`} key={booking.id} className="previous-booking-card">
              <img className="previous-booking-image" 
              src={booking.Spot.previewImage} 
              alt={booking.Spot.name} />
              <div className="previous-booking-details">
                <span className="bold">{booking.Spot.city}</span>
                <span>Hosted by <span className="bold">{booking.Spot.host}</span></span>
                <span>Stayed from {convertDates(booking.startDate)}</span>
                <span>to {convertDates(booking.endDate)}</span>
              </div>
            </Link>
          ))
            : <h3>You haven't booked any trips yet!</h3>
          }
        </div>

      </div>
      )}
    </>
    )
  }

  export default UserBookings;
