import { Link } from "react-router-dom"
import './SpotCard.css'

function SpotCardInfo({ spot }) {

  return (
    <Link to={`/spots/${spot.id}`} spotid={spot.id} className="spot-card-link">
      <div className="spot-card-info">
        <div className="spot-card-image-box">
          <img src={spot.previewImage} alt={spot.name} className="spot-card-image"></img>
        </div>
        <div className="spot-card-title">
          <h4>{spot.city}, {spot.state}</h4>
          <p>★ {spot.avgRating}</p>
        </div>
        <div className="spot-card-details">
          <div className="spot-card-name">{spot.name}</div>
          <div className="spot-card-description">{spot.description}</div>
        </div>
        <div className="spot-card-footer">
          <span className="spot-card-price">${spot.price}</span> night
        </div>
      </div>
    </Link>
  )
}

export default SpotCardInfo;
