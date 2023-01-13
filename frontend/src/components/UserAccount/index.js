import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { loadUserReviewsThunk } from '../../store/reviews';
import { getSpots } from '../../store/spots';
import './ProfilePage.css'

function ProfilePage() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const allSpots = useSelector(state => state.spots.spotsList);
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    dispatch(getSpots()).
    then(setDataLoaded(true))
  }, [dispatch])

  // turn allSpots into an array
  const spotsList = Object.values(allSpots);

  // filter through for spots where ownerId matches user Id
  const mySpots = spotsList.filter(spot => spot.ownerId === user.id)
  
  if (!dataLoaded) {
    return null;
  }


  return (
    <div className="user-page-container">
      <div className="user-page-welcome">
        <h1>Welcome {user.username}!</h1>
      </div>
      { mySpots?.length ?
      <>
      <p>These are your current listings with us:</p>
      <div className="user-spots-list">
        {mySpots.map(spot => (
          <Link to={`/spots/${spot.id}`} key={spot.id} className='user-spot-links'>
            <img src={spot.previewImage}></img>
            {spot.name}
            </Link>
        ))}
      </div>
      </>
      : <p>You currently have no listings with us.</p>
      }
    </div>

  )
}

export default ProfilePage;
