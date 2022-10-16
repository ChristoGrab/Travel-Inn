import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getAllSpots } from '../../store/allSpots';
import { Link } from 'react-router-dom'

function SpotCard() {
  
  const dispatch = useDispatch()
  const spotsObj = useSelector(state => state.spots)
  console.log("This is all-spots: ", spotsObj)
  
  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])
  
  const allSpots = spotsObj["Spots"]
  const spotsArray = Object.values(allSpots)
  console.log("This is my array of spots ", spotsArray)
  
  return (
    <div>
      <h2>This is my spot card</h2>
      <ul>
        {spotsArray.map(spot => {
          <li key={spot.id}>
            <p>{spot.name}</p>
          </li>
        })}
      </ul>
    </div>
  )
}

export default SpotCard;
