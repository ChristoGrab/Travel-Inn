import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import { calculateTotalPrice } from '../../functions/calculateTotalPrice'
import "./ReservationBox.css";
import { calculateLengthOfStay } from "../../functions/lengthOfStay";

const ReservationBox = ({ spot }) => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  let reviewDiv;
    
    if (spot.numReviews > 0) {
    reviewDiv = (
      <span><i className="fa-solid fa-star" />{spot.avgStarRating} • {spot.numReviews} reviews</span>
    )} else {
      reviewDiv = (
        <span>No reviews</span>
      )
    }
    
    const pullDates = async (start, end) => {
      setStartDate(start)
      setEndDate(end)
      setNights(calculateLengthOfStay(start, end))
    }
    
    useEffect(() => {
      setTotalPrice(calculateTotalPrice(nights, spot.price))
    }, [nights])

  return (
    <div className="reservation-box">
      <div className="reservation-box-header">
      <span> <span className="bold">${spot.price} </span>night</span> 
        {reviewDiv}
      </div>
      <Calendar price={spot.price} pullDates={pullDates}/>
      <div className="reservation-box-footer">
        <div className="reservation-box-footer-prices">
          <span className="bold">${spot.price}</span> x {nights} nights
        </div>
        <div className="reservation-box-footer-prices">
          <span>Total after taxes</span> ${totalPrice}
        </div>
      </div>
    </div>
  )
}

export default ReservationBox;
