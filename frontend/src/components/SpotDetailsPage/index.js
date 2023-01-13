import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOneSpot } from '../../store/spots';
import { clearSpot } from '../../store/spots'
import { loadSpotReviewsThunk } from '../../store/reviews';
import ReviewsBySpot from './SpotReviews'
import ReservationBox from '../Bookings/ReservationBox';
import './SpotDetailsPage.css';

function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [dataLoaded, setDataLoaded] = useState(false);

  const spot = useSelector(state => state.spots.singleSpot);
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {

    dispatch(getOneSpot(spotId))
      .then(() => setDataLoaded(true))

    return (() => dispatch(clearSpot()))

  }, [dispatch, spotId])

  let imageList = []

  if (!dataLoaded) return null;

  if (spot.SpotImages) {
    spot.SpotImages.forEach(img => imageList.push(img))
  }

  if (!spot.SpotImages) return null;


  return (
    <div className='spot-page-outer-container'>
      <div className="spot-page-section-1">
        <div className="spot-details-header">
          <div className="spot-details-title">{spot.name}</div>
          <div className="spot-details-subtitle">
            <span className="spot-details-stars">★ {spot.avgStarRating}</span>
            <span>• {spot.numReviews} Reviews</span>
            <span className="spot-details-location"> {spot.city}, {spot.state}, {spot.country}</span>
          </div>
        </div>
        <div className="spot-details-image-list">
          {imageList.map(img => (
            <img key={img.id} src={img.url} alt={img.name}></img>
          ))}
        </div>
      </div>

      <div className="spot-page-section-2">
        <div className="spot-page-section-2-left">
          <div className="spot-page-box">
            Free cancellation until 24 hours before check-in
          </div>
          <div className="spot-page-box">
            <span>InnCover</span>
            <span>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</span>
          </div>
          <div className="spot-page-box">
            {spot.description}
          </div>
        </div>
        <div className="spot-page-section-2-right">
        {currentUser && currentUser.id === spot.Owner.id ?
          <div className="listing-owner-container">
            <div className="spot-owner-div">
              <Link
                className="spot-owner-links"
                to={`/spots/${spot.id}/edit`}>Edit your listing</Link>
            </div>
            <div className="spot-owner-div">
              <Link className="spot-owner-links"
                to={`/spots/${spot.id}/delete`}>Delete your listing</Link>
            </div>
          </div>
          : <ReservationBox spot={spot} />
        }
        </div>
      </div>

      <div className="spot-page-section-3">
        <ReviewsBySpot spotId={spot.id} currentUser={currentUser} spotOwnerId={spot.Owner.id} />
      </div>
    </div>
  )
}

export default SpotDetails;
