import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import { calculateTotalPrice } from '../../functions/calculateTotalPrice'
import "./ReservationBox.css";

const ReservationBox = ({ spot }) => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  let reviewDiv;
  
  console.log(spot)
    
    if (spot.numReviews > 0) {
    reviewDiv = (
      <span><i className="fa-solid fa-star" />{spot.avgStarRating} • {spot.numReviews} reviews</span>
    )
    } else {
      reviewDiv = (
        <span>No reviews</span>
      )
    }
  
  // useEffect(() => {
  //   // let quote = calculateTotalPrice(0, endDate, spot.price)
  //   // setTotalPrice(quote)
    
  // }, [startDate, endDate, spot.price])

  return (
    <div className="reservation-box">
      <div className="reservation-box-header">
      <span> <span className="bold">${spot.price} </span>night</span> 
        {reviewDiv}
      </div>
      <Calendar />
      <div className="reservation-box-footer">
        <div className="reservation-box-footer-prices">
          <span className="bold">${spot.price}</span> x nights
        </div>
        <div className="reservation-box-footer-prices">
          <span>Total after taxes</span> ${totalPrice}
        </div>
      </div>
    </div>
  )
}

export default ReservationBox;
