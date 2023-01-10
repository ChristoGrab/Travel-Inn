import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { getAllSpots } from '../../store/spots';
import SpotCardInfo from './SpotCard'
import "./LandingPage.css"

function LandingPage() {

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
        <div className="landing-page-grid">
          {spotsArray.map(spot => (
            <SpotCardInfo key={spot.id} spot={spot}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default LandingPage;
