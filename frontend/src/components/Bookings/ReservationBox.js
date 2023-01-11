import Calendar from "./Calendar";
import "./ReservationBox.css";

const ReservationBox = ({spot}) => {
  return (
    <div className="reservation-box">
      <div className="reservation-box-header">
        <span>${spot.price}</span>
      </div>
    <Calendar />
    </div>
  )
}

export default ReservationBox;
