import { Link } from "react-router-dom"
import './SpotCard.css'

function SpotCardInfo({ spot }) {

  return (
    <Link to={`/spots/${spot.id}`} spotid={spot.id}>
    <div className="spot-card-info">
      <div className="spot-card-image">
        <img src={spot.previewImage} alt={spot.name}></img>
      </div>
      <div className="spot-card-title">
        <h3>{spot.city}, {spot.state}</h3>
        <p>★ {spot.avgRating}</p>
      </div>
      <div className="spot-card-details">
        <p>{spot.name}</p>
        <p>{spot.description}</p>
        <p className="spot-card-price">${spot.price}</p>
      </div>
    </div>
    </Link>
  )
}

export default SpotCardInfo;
