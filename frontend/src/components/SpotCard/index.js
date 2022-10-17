import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
import SpotCardInfo from './SpotCard'

function SpotCard() {

  const dispatch = useDispatch()
  const spotsObj = useSelector(state => state.spots)
  console.log("This is all-spots: ", spotsObj)

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  const allSpots = spotsObj["Spots"]
  const spotsArray = Object.values(allSpots)

  return (
    <div className="spot-card-container">
        <ul className="spot-card-list">
          {spotsArray.map(spot => (
          <li key={spot.id}>
            <SpotCardInfo spot={spot}/>
          </li>
          ))}
        </ul>
    </div>
  )
}

export default SpotCard;
