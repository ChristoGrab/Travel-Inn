import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
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
  

  const spotsList = Object.values(allSpots);
  const mySpots = spotsList.filter(spot => spot.ownerId === user.id)

  const reviewsList = Object.values(userReviews); 
  
  return (
    <div className="user-page-container">
      <div className="user-page-welcome">
        <h1>Hello {user.firstName}</h1>
      </div>
      <p>These are your current listings with us:</p>
      <ul>
        {mySpots.map(spot => (
          <li key={spot.id}>{spot.name}</li>
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
