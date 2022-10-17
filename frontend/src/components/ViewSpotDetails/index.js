import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ViewSpotDetails() {
  
  const { spotId } = useParams;
  console.log(spotId)
  
  
  const mySpot = useSelector(state => state.spots.singleSpot);

  if (!mySpot) {
    return (
      <div>
        We're sorry, the listing you are trying to find is not in our records.
      </div>
    )
  }
  
  return (
    <div className="spot-details-container">
      <div className="spot-details-header">
        {mySpot.name}
        {mySpot.avgRating}
        {mySpot.numReviews}
        {mySpot.city}, {mySpot.state}, {mySpot.country}
      </div>
    </div>
  )
}

export default ViewSpotDetails;
