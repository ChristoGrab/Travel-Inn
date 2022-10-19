import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
import SpotCardInfo from './SpotCard'

function SpotCard() {

  // set state variable to false until data loads.
  const [dataLoaded, setDataLoaded] = useState(false)
  const dispatch = useDispatch()
  const spotsObj = useSelector(state => state.spots)

  useEffect(() => {
    dispatch(getAllSpots()).then(setDataLoaded(true));
  }, [dispatch])

  // turn the object containing all spots into an array for mapping
  const allSpots = spotsObj.spots
  const spotsArray = Object.values(allSpots)

  return (
    <div className="spot-card-container">
      {dataLoaded && (
        <ul className="spot-card-list">
          {spotsArray.map(spot => (
          <li key={spot.id}>
            <SpotCardInfo spot={spot}/>
          </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SpotCard;
