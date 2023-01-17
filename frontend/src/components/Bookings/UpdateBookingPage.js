import ReservationBox from "./ReservationBox"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getOneSpot } from "../../store/spots";
import Calendar from "../Bookings/Calendar";

const UpdateBookingPage = () => {
  
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots[spotId])
  
  console.log(spot)
  
  useEffect(() => {
    dispatch(getOneSpot(spotId))
  }, [dispatch, spotId])
  
  return (
    <Calendar spot={spot}/>
  )
}

export default UpdateBookingPage;
