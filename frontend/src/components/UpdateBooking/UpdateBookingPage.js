import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { getUserBookingsThunk } from "../../store/bookings";
import { getOneSpot } from "../../store/spots";
import UpdateCalendar from "./UpdateCalendar";
import { calculateLengthOfStay } from "../../functions/lengthOfStay";
import { calculateTotalPrice } from "../../functions/calculateTotalPrice";
import "./UpdateBookingPage.css"

const UpdateBookingPage = () => {

  const dispatch = useDispatch();
  const { spotId } = useParams();
  const { bookingId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot)
  const bookingToUpdate = useSelector(state => state.bookings.userBookings[bookingId])
  const [currentStart, setCurrentStart] = useState(null);
  const [currentEnd, setCurrentEnd] = useState(null);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(getOneSpot(spotId))
    dispatch(getUserBookingsThunk())
  }, [dispatch, spotId])

  const pullDates = async (start, end) => {
    setCurrentStart(start)
    setCurrentEnd(end)
    setNights(calculateLengthOfStay(start, end))
  }

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(nights, spot.price))
  }, [nights])

  useEffect(() => {
    if (bookingToUpdate) {
      console.log("booking in component: ", bookingToUpdate)
      setCurrentStart(bookingToUpdate.startDate)
      setCurrentEnd(bookingToUpdate.endDate)
    }
  }, [bookingToUpdate])

  if (!spot) return null;
  if (!bookingToUpdate) return null;

  return (
    <div className="update-reservation-box">
      <div className="update-reservation-box-header">
        <h3>Please select your new desired dates</h3>
        <span> <span className="bold">${spot.price} </span>night</span>
      </div>
      <UpdateCalendar 
        pullDates={pullDates} 
        currentStart={currentStart} 
        currentEnd={currentEnd}
        bookingId={bookingId}
      />
      {currentStart && currentEnd && (
        <div className="reservation-box-footer">
          <div className="reservation-box-footer-prices">
            <span className="bold">${spot.price}</span> x {nights} nights
          </div>
          <div className="reservation-box-footer-prices">
            <span>Total after taxes</span> ${totalPrice}
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateBookingPage;
