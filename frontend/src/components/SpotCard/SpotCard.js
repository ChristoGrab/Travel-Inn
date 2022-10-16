import './SpotCard.css'

function SpotCardInfo({ spot }) {
  console.log("This is my spot:", spot)

  return (
    <div className="spot-card-info">
      <div className="spot-card-title">
        <h3>{spot.city}, {spot.state}</h3>
        <p>{spot.avgRating}</p>
      </div>
      <div className="spot-card-details">
        <p>{spot.name}</p>
        <p>{spot.description}</p>
        <p>${spot.price}</p>
      </div>
    </div>
  )
}

export default SpotCardInfo;
