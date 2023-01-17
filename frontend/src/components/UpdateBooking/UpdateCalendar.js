import { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import styled from "styled-components";
import { findBookedDates } from '../../functions/findBookedDates';
import { updateBookingThunk, getBookingsThunk, clearBookingsAction, } from '../../store/bookings';
import LoadingScreen from '../LoadingScreen';
import "react-datepicker/dist/react-datepicker.css";

const UpdateStyles = styled.div`

  .react-datepicker-popper {
    margin: 0;
  }
  
  .react-datepicker {
    padding: 20px;
    border-radius: 10px;
  }
  
  .react-datepicker-month-container {
    width: 100%;
    background-color: white;
  }
  
  .react-datepicker__day--disabled {
    color: #d3d3d3;
    background-color: #e6e6e6;
    text-decoration: line-through;
  }
  
  .react-datepicker__day--disabled:hover {
    background-color: black;
    color: black;
    border-radius: 0;
  }
  
  .react-datepicker__navigation--next {
    right: 0;
  }
  
  .react-datepicker__header {
    background-color: white;
  }
  
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    width: 100%;
    height: 45px;
    background-color: white;
    // preventOverflow: offset;
    flip: offset;
    border-radius: 7px;
  }
  
  .react-datepicker__day:hover {
    background-color: lightred;
    
  }
  }
  
`;

const DatePickerRange = ({ pullDates, currentStart, currentEnd, bookingId }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [unavailableDates, setUnavailableDates] = useState([])
  
  useEffect(() => {
    if (spotId) {
      console.log("restrictedBookings happened")
      csrfFetch(`/api/bookings/restricted/${spotId}/${bookingId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach(booking => {
          const bookedDates = findBookedDates(booking.startDate, booking.endDate)
          setUnavailableDates(prev => [...prev, ...bookedDates])
        })
      })
    }
  }, [spotId, bookingId])
  
  useEffect(() => {
    dispatch(getBookingsThunk(spotId))
    return (() => dispatch(clearBookingsAction()))
  }, [dispatch, spotId])

  useEffect(() => {
    if (currentStart && currentEnd) {
      setStartDate(new Date(currentStart))
      setEndDate(new Date(currentEnd))
    }
  }, [bookingId])

  useEffect(() => {
    if (errors.length) {
      setLoadingScreen(false)
    }
  }, [errors])

  useEffect(() => {
    pullDates(startDate, endDate)
  }, [startDate, endDate])

  // Create a new booking and send it to the backend
  const createReservation = async (e) => {
    e.preventDefault();

    setLoadingScreen(true)

    const new_booking = {
      startDate,
      endDate
    }

    dispatch(updateBookingThunk(new_booking, bookingId))
      .then(response => history.push(`/user/bookings`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors([data.errors])
        }
      }
      )
  }

  return (
    <>
      {loadingScreen && <LoadingScreen />}
      <div className="update-calendar-container">
        <div className="check-in-container">
          <label className="booking-label">CHECK-IN</label>
          <DatePicker
            id="check-in"
            selected={startDate}
            excludeDates={unavailableDates}
            placeholderText="Select New Start Date"
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            isClearable
            monthsShown={2}
          />
        </div>
        <div className="check-out-container">
          <label className="booking-label">CHECK-OUT</label>
          <DatePicker
            filterDate={date => {
              return new Date() < date;
            }}
            selected={endDate}
            excludeDates={unavailableDates}
            placeholderText="Select New End Date"
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            onChange={date => setEndDate(date)}
            minDate={startDate}
            isClearable
            monthsShown={2}
          />
        </div>
      </div>

      <div>
        {errors.length > 0 && (
          <div className="errors-container">
            {errors.map((error, ind) => (
              <div className="form-error" key={ind}>{error}</div>
            ))}
          </div>
        )}
      </div>

      {startDate && endDate ?
        <button className="reservation-button"
          onClick={createReservation}>
          Reserve
        </button>
        : <button className="disabled-reservation">
          Select Dates
        </button>
      }

    </>
  )
}

const UpdateCalendar = ({ pullDates, currentStart, currentEnd, bookingId }) => {

  console.log("Current Start", currentStart)
  console.log("Current End", currentEnd)
  console.log("Booking ID", bookingId)

  return (
    <UpdateStyles>
      <DatePickerRange
        pullDates={pullDates}
        currentStart={currentStart}
        currentEnd={currentEnd}
        bookingId={bookingId}
      />
    </UpdateStyles>
  )
}

export default UpdateCalendar;

