import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import styled from "styled-components";
import { createBookingThunk, getBookingsThunk, clearBookingsAction } from '../../store/bookings';
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css"


const Styles = styled.div`
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    width: 100%;
    height: 45px;
    background-color: white;
  }
`;

const DatePickerRange = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const {spotId} = useParams();
  const bookings = useSelector(state => state.bookings.spotBookings)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  useEffect(() => {
    dispatch(getBookingsThunk(spotId))
    
    return (() => dispatch(clearBookingsAction()))
  }, [dispatch, spotId])
  
  const createReservation = (e) => {
    e.preventDefault();
  
    const new_booking = {
      startDate,
      endDate
    }
    
    console.log(new_booking)
    
    dispatch(createBookingThunk(spotId, new_booking))
    .then(() => history.push(`/user/bookings`))
    }

  return (
  <div className="calendar-container">
    <div className="check-in-container">
    <label className="booking-label">CHECK-IN</label>
    <DatePicker
      filterDate={date => {
        return new Date() < date;
      }}
      selected={startDate} 
      placeholderText="Select Start Date"
      onChange={date => setStartDate(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}/>
    </div>
    <div className="check-out-container">
    <label className="booking-label">CHECK-OUT</label>
    <DatePicker
      filterDate={date => {
        return new Date() < date;
      }}
      selected={endDate}
      placeholderText="Select End Date"
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      onChange={date => setEndDate(date)}
      minDate={startDate}
      />
    </div>
    <button className="reservation-button" onClick={createReservation}>Reserve</button>
  </div>
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

