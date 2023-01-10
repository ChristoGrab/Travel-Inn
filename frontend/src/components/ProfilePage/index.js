import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { loadUserReviewsThunk } from '../../store/reviews';
import { getSpots } from '../../store/spots';
import './ProfilePage.css'

function ProfilePage() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const allSpots = useSelector(state => state.spots.spots);
  // const userReviews = useSelector(state => state.reviews.user)

  useEffect(() => {
    dispatch(getSpots());
    dispatch(loadUserReviewsThunk());
  }, [dispatch])

  // turn allSpots into an array
  const spotsList = Object.values(allSpots);

  // filter through for spots where ownerId matches user Id
  const mySpots = spotsList.filter(spot => spot.ownerId === user.id)


  return (
    <div className="user-page-container">
      <div className="user-page-welcome">
        <h1>Welcome {user.username}!</h1>
      </div>
      <p>These are your current listings with us:</p>
      <div className="user-spots-list">
        {mySpots.map(spot => (
          <Link to={`/spots/${spot.id}`} key={spot.id} className='user-spot-links'>
            <img src={spot.previewImage}></img>
            {spot.name}
            </Link>
        ))}
      </div>
    </div>
  )
}

export default ProfilePage;


