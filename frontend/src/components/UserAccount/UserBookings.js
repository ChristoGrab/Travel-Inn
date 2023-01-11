import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookingsThunk, deleteBookingThunk } from '../../store/bookings';
import LoadingScreen from '../LoadingScreen';
import './UserBookings.css'

const UserBookings = () => {

  const dispatch = useDispatch();
  const userBookings = useSelector(state => Object.values(state.bookings.userBookings))
  let upcomingBookings = [];
  let pastBookings = [];

  upcomingBookings = userBookings.filter(booking => {
    return booking.startDate > new Date().toISOString().split('T')[0]
  })

  pastBookings = userBookings.filter(booking => {
    return booking.startDate < new Date().toISOString().split('T')[0]
  })

  console.log(upcomingBookings)
  console.log(pastBookings)



  useEffect(() => {
    dispatch(getUserBookingsThunk())
  }, [dispatch, upcomingBookings.length])


  const deleteBooking = (e) => {
    e.preventDefault();


    dispatch(deleteBookingThunk(e.target.value))
      .catch(res => {
        (console.log(res))
      })
  }

  return (
    <div className="user-bookings-page">
      <div className="user-bookings-header">
        <h1>Trips</h1>
        <h2>Upcoming reservations</h2>
      </div>

      <div className="upcoming-bookings-container">
        {upcomingBookings.length ? upcomingBookings?.map(booking => (
          <div key={booking.id} className="upcoming-booking-card">
            <div className='upcoming-booking-box-1'>
              <div className="upcoming-booking-name">
              <div className="bold">{booking.Spot.city}</div>
              <span>{booking.Spot.name}</span>
              </div>
              <div className="upcoming-booking-dates">
              <span>{booking.startDate}</span>
              <span>{booking.endDate}</span>
              </div>
              <div className="upcoming-booking-place">
              <div>{booking.Spot.address}</div>
              <div>{booking.Spot.country}</div>
              </div>
            </div>
            <img className="medium-image" src={booking.Spot.previewImage}></img>
            <div className="upcoming-booking-box-3">
              <button>Change this booking</button>
              <button value={booking.id} onClick={(e) => deleteBooking(e)}>Cancel this booking</button>
            </div>
          </div>
        ))
          : <h3>You don't have any upcoming reservations</h3>}
      </div>

      <h2>Where you've been</h2>
      <div className="previous-bookings-container">
        {pastBookings.length ? pastBookings?.map(booking => (
          <div key={booking.id} className="previous-booking-card">
            <img className="previous-booking-image" src={booking.Spot.previewImage} />
            <div className="previous-booking-details">
              <span className="bold">{booking.Spot.city}</span>
              <span>{booking.startDate}</span>
              <span>{booking.endDate}</span>
            </div>
          </div>
        ))
          : <h3>You haven't booked any trips yet!</h3>
        }
      </div>

    </div>
  )
}

export default UserBookings;
