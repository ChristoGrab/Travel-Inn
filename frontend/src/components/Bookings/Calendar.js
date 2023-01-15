import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import styled from "styled-components";
import { findBookedDates } from '../../functions/findBookedDates';
import { createBookingThunk, getBookingsThunk, clearBookingsAction } from '../../store/bookings';
import LoadingScreen from '../LoadingScreen';
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css"


const Styles = styled.div`

  .react-datepicker-popper {
    margin: 0;
    width: 100%;
  }
  
  .react-datepicker-month-container {
    width: 100%;
  }
  
  .react-datepicker__day--disabled {
    color: #d3d3d3;
    background-color: #f2f2f2;
    text-decoration: line-through;
  }
  
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    width: 100%;
    height: 45px;
    background-color: white;
    preventOverflow: offset;
    flip: offset;
  }
`;

const DatePickerRange = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const bookings = useSelector(state => Object.values(state.bookings.spotBookings))
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

  let unavailableDates = []

  for (let booking of bookings) {
    unavailableDates = unavailableDates.concat(findBookedDates(booking.startDate, booking.endDate))
  }

  const createReservation = async (e) => {
    e.preventDefault();

    setLoadingScreen(true)

    const new_booking = {
      startDate,
      endDate
    }

    console.log("Booking object to send to backend: ", new_booking)

    dispatch(createBookingThunk(spotId, new_booking))
      .then(response => history.push(`/user/bookings`))
      .catch(async (res) => {
        const data = await res.json();
        console.log("Data from booking", data)
        if (data && data.errors) return setErrors([data.errors])
      }
      )
  }

  return (
    <>
      {loadingScreen && <LoadingScreen />}
      <div className="calendar-container">
        <div className="check-in-container">
          <label className="booking-label">CHECK-IN</label>
          <DatePicker
            selected={startDate}
            excludeDates={unavailableDates}
            placeholderText="Select Start Date"
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
      <button className="reservation-button"
        onClick={createReservation}>
        Reserve
      </button>

    </>
  )
}

const Calendar = () => {
  return (
    <Styles>
      <DatePickerRange />
    </Styles>
  )
}

export default Calendar;

