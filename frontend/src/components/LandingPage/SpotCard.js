import { Link } from "react-router-dom"

function SpotCardInfo({ spot }) {

  return (
    <Link to={`/spots/${spot.id}`} spotid={spot.id} className="spot-card">
        <div className="spot-card-image-box">
          <img src={spot.previewImage} alt={spot.name} className="spot-card-image"></img>
        </div>
        <div className="spot-card-details-container">
        <div className="spot-card-title">
          <div className="spot-card-location">{spot.city}, {spot.state}</div>
          <div className="spot-card-rating">★ {spot.avgRating}</div>
        </div>
        <div className="spot-card-details">
          <div className="spot-card-name">{spot.name}</div>
        </div>
        <div className="spot-card-footer">
          <span className="spot-card-price">${spot.price}</span> night
        </div>
      </div>
    </Link>
  )
}

export default SpotCardInfo;
