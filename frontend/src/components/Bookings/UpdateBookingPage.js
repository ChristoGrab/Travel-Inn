import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { getUserBookingsThunk } from "../../store/bookings";
import { getOneSpot } from "../../store/spots";
import UpdateCalendar from "./UpdateCalendar";
import { calculateLengthOfStay } from "../../functions/lengthOfStay";
import { calculateTotalPrice } from "../../functions/calculateTotalPrice";

const UpdateBookingPage = () => {
  
  const { spotId } = useParams();
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots.singleSpot)
  const bookingToUpdate = useSelector(state => state.bookings.userBookings[bookingId])
  const [currentStart, setCurrentStart] = useState(null);
  const [currentEnd, setCurrentEnd] = useState(null);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  let reviewDiv;
  
  console.log(spot)
  console.log(bookingToUpdate)

  
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
      setCurrentStart(bookingToUpdate.startDate)
      setCurrentEnd(bookingToUpdate.endDate)
    }}, [bookingToUpdate])


  if (!spot) return null;
  if (!bookingToUpdate) return null;
      
  if (spot.numReviews > 0) {
    reviewDiv = (
      <span><i className="fa-solid fa-star" />{spot.avgStarRating} • {spot.numReviews} reviews</span>
    )} else {
      reviewDiv = (
        <span>No reviews</span>
      )
    }

  
  return (
    <div className="reservation-box">
    <div className="reservation-box-header">
    <span> <span className="bold">${spot.price} </span>night</span> 
      {reviewDiv}
    </div>
    <UpdateCalendar price={spot.price} pullDates={pullDates} currentStart={currentStart} currentEnd={currentEnd} />
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
