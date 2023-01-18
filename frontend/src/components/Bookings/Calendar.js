import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import styled from "styled-components";
import { findBookedDates } from '../../functions/findBookedDates';
import { createBookingThunk, getBookingsThunk, clearBookingsAction } from '../../store/bookings';
import LoadingScreen from '../LoadingScreen';
import { calculateTotalPrice } from '../../functions/calculateTotalPrice';
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css"


const Styles = styled.div`

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

const DatePickerRange = ( {price, pullDates} ) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const bookings = useSelector(state => Object.values(state.bookings.spotBookings))
  const user = useSelector(state => state.session.user)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(false)

  useEffect(() => {
    dispatch(getBookingsThunk(spotId))

    return (() => dispatch(clearBookingsAction()))
  }, [dispatch, spotId])

  useEffect(() => {
    if (errors.length) {
      setLoadingScreen(false)
    }
  }, [errors])

  // Create an array of all the dates that are booked
  let unavailableDates = []
  for (let booking of bookings) {
    unavailableDates = unavailableDates.concat(findBookedDates(booking.startDate, booking.endDate))
  }
  
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

    dispatch(createBookingThunk(spotId, new_booking))
      .then(response => history.push(`/user/bookings`))
      .catch(async (res) => {
        const data = await res.json();
        console.log("Data from booking", data)
        if (data && data.errors) return setErrors([data.errors])
      }
      )
  }
  
  if (!user) return null;

  return (
    <>
      {loadingScreen && <LoadingScreen />}
      <div className="calendar-container">
        <div className="check-in-container">
          <label className="booking-label">CHECK-IN</label>
          <DatePicker
            id="check-in"
            selected={startDate}
            excludeDates={unavailableDates}
            placeholderText="Select Start Date"
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            maxDate={endDate}
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
            placeholderText="Select End Date"
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

const Calendar = ({price, pullDates}) => {
  return (
    <Styles>
      <DatePickerRange pullDates={pullDates} price={price}/>
    </Styles>
  )
}

export default Calendar;

