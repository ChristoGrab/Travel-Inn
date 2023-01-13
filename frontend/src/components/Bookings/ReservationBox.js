import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import { calculateTotalPrice } from '../../functions/calculateTotalPrice'
import "./ReservationBox.css";

const ReservationBox = ({ spot }) => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  

  return (
    <div className="reservation-box">
      <div className="reservation-box-header">
        <span className="bold">${spot.price}</span> <span>night</span>
      </div>
      <Calendar />
      <div className="reservation-box-footer">
        <div className="reservation-box-footer-prices">
          <span className="bold">${spot.price}</span> x nights
        </div>
        <div className="reservation-box-footer-prices">
          <span>Total after taxes</span> ${spot.price}
        </div>
      </div>
    </div>
  )
}

export default ReservationBox;
