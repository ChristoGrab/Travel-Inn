import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOneSpot } from '../../store/spots';
import { clearSpot } from '../../store/spots'
import ReviewsBySpot from './SpotReviews'
import ReservationBox from '../Bookings/ReservationBox';
import convertDecimal from '../../functions/convertDecimal';
import Map from '../Map';
import Footer from '../Footer';
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
          <div className="spot-page-box bold">
            Free cancellation until 24 hours before check-in
          </div>
          <div className="spot-page-box">
            <span className="air-cover-text"><span className="light-red">Inn</span>Cover</span>
            <span>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</span>
          </div>
          <div className="last-spot-page-box">
            {spot.description}
          </div>
        </div>
        <div className="spot-page-section-2-right">
        {currentUser && currentUser.id === spot.Owner.id ?
          <div className="spot-page-section-2-right-owner-container">
              <Link
                className="action-link"
                to={`/spots/${spot.id}/edit`}>Edit listing
              </Link>
              <Link className="action-link"
                to={`/spots/${spot.id}/delete`}>Remove listing
              </Link>
              <button>Add Image</button>
          </div>
          : <ReservationBox spot={spot} />
        }
        </div>
      </div>

      <div className="spot-page-section-3">
        <ReviewsBySpot spotId={spot.id} currentUser={currentUser} spotOwnerId={spot.Owner.id} averageRating={spot.avgStarRating}/>
      </div>
      
      {currentUser && currentUser.id === spot.Owner.id ? null 
      :
      <div className="spot-page-section-4">
        <h2>Where you'll be</h2>
        <Map lat={parseFloat(spot.lat)} lng={parseFloat(spot.lng)}/>
        <span className="bold">{spot.city}, {spot.state}, {spot.country}</span>
      </div>
      } 
      <Footer />
    </div>
  )
}

export default SpotDetails;
