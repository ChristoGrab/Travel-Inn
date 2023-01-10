import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOneSpot } from '../../store/spots';
import { clearSpot } from '../../store/spots'
import { loadSpotReviewsThunk } from '../../store/reviews';
import ReviewsBySpot from './SpotReviews'
import './SpotDetailsPage.css';

function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [dataLoaded, setDataLoaded] = useState(false);

  const spot = useSelector(state => state.spots.singleSpot);
  const currentUser = useSelector(state => state.session.user);
  const reviewList = useSelector(state => state.reviews.spot);

  useEffect(() => {

    dispatch(getOneSpot(spotId));
    dispatch(loadSpotReviewsThunk(spotId))
      .then(() => setDataLoaded(true))

    return (() => dispatch(clearSpot()))

  }, [dispatch, dataLoaded, spotId])

  let imageList = []
  let hasLeftReview = false;

  if (!dataLoaded) return null;

  // need to create a conditional for mapping images, otherwise
  // runs into a timing issue with dispatch.
  if (spot.SpotImages) {
    spot.SpotImages.forEach(img => imageList.push(img))
  }

  if (!spot.SpotImages) return null;

  // if (reviewsObj && currentUser) Object.values(reviewsObj).forEach(review => {
  //   if (review.userId === currentUser.id) reviewsOfUser.push(review)
  // })

  // if (reviewsOfUser.length > 0) hasLeftReview = true;


  return (
    <div className='spot-details-outer-container'>
      <div className="spot-details-container">
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
        <div className="spot-details-description">
          {spot.description}
        </div>
        <div>
          {currentUser && currentUser.id === spot.Owner.id && (
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
          )}
        </div>
      </div>
      <ReviewsBySpot spotId={spot.id} currentUser={currentUser}/>
    </div>
  )
}

export default SpotDetails;
