import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getAllSpots } from '../../store/allSpots';
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
      <div className="spot-card-info">
        <ul className="spot-card-list">
          {spotsArray.map(spot => (
          <li key={spot.id} 
          spot={spot}>
            <SpotCardInfo spot={spot}/>
          </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SpotCard;
