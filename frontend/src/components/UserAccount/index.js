import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { loadUserReviewsThunk } from '../../store/reviews';
import { getAllSpots } from '../../store/spots';
import { spotCardInfo } from '../SpotCard/SpotCard'
import './UserAccount.css'

function UserDetails() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const allSpots = useSelector(state => state.spots.spots);
  const userReviews = useSelector(state => state.reviews.user)

  useEffect(() => {
    dispatch(getAllSpots());
    dispatch(loadUserReviewsThunk());
  }, [dispatch])

  // whole bunch of hot garbage here
  // turn allSpots into an array
  const spotsList = Object.values(allSpots);
  
  // filter through for spots where ownerId matches user Id
  const mySpots = spotsList.filter(spot => spot.ownerId === user.id)
  
  // conditional rendering for wonky render errors
  if (!userReviews) return null;
  
  // now I'm also turning userReviews into an array
  const reviewsList = Object.values(userReviews); 

  return (
    <div className="user-page-container">
      <div className="user-page-welcome">
        <h1>Hello {user.firstName}</h1>
      </div>
      <p>These are your current listings with us:</p>
      <ul className="user-spots-list">
        {mySpots.map(spot => (
          <Link to={`/spots/${spot.id}`} key={spot.id} className='user-spot-links'>{spot.name}</Link>
        ))}
      </ul>
      <p>And here are your current reviews:</p>
      <ul>
        {reviewsList.map(review => (
          <li key={review.id}>{review.review}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetails;
