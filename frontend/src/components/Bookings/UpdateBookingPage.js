import ReservationBox from "./ReservationBox"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getOneSpot } from "../../store/spots";

const UpdateBookingPage = () => {
  
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots[spotId])
  
  useEffect(() => {
    dispatch(getOneSpot(spotId))
  }, [dispatch, spotId])
  
  return (
    <ReservationBox spot={spot}/>
  )
}

export default UpdateBookingPage;
