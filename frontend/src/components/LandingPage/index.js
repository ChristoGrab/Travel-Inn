import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { getSpots } from '../../store/spots';
import Footer from '../Footer';
import SpotCardInfo from './SpotCard'
import "./LandingPage.css"

function LandingPage() {

  // set state variable to false until data loads.
  const [dataLoaded, setDataLoaded] = useState(false)
  const dispatch = useDispatch()
  const spotsList = useSelector(state => Object.values(state.spots.spotsList))

  useEffect(() => {
    dispatch(getSpots()).then(setDataLoaded(true));
  }, [dispatch])


  return (
    <>
      {dataLoaded && (
        <div className="spot-card-container">
          <div className="landing-page-grid">
            {spotsList.map(spot => (
              <SpotCardInfo key={spot.id} spot={spot} />
            ))}
          </div>
          <Footer />
        </div>
      )}
    </>
  )
}

export default LandingPage;
