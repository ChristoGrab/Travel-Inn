import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOneSpot } from '../../store/spots';
import { clearSpot } from '../../store/spots'
import { loadSpotReviewsThunk } from '../../store/reviews';
import ReviewsBySpot from './ReviewsBySpot'
import './ViewSpotDetails.css';

function ViewSpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  //set a state variable to prevent page loading before data is ready
  //to avoid rendering previous state data
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {

    dispatch(getOneSpot(spotId))
    dispatch(loadSpotReviewsThunk(spotId))
    setDataLoaded(true)

    return (() => dispatch(clearSpot()))
  }, [dispatch, dataLoaded, spotId])

  const mySpot = useSelector(state => state.spots.singleSpot);
  const currentUser = useSelector(state => state.session.user);
  const reviewsObj = useSelector(state => state.reviews.spot)

  let imageList = [];

  // need to create a conditional for mapping images, otherwise
  // runs into a timing issue with dispatch.
  if (mySpot.SpotImages) {
    mySpot.SpotImages.forEach(img => imageList.push(img))
  }

  // console.log("THis is the reviewsObj in my component: ", reviewsObj)

  if (!mySpot.SpotImages) return null;
  if (!reviewsObj) return null;
  
  if (reviewsObj) console.log("This is reviewsObj: ", reviewsObj)

  return (
    <div className='spot-details-outer-container'>
      <div className="spot-details-container">
        <div className="spot-details-header">
          <div className="spot-details-title">{mySpot.name}</div>
          <div className="spot-details-subtitle">
            <span className="spot-details-stars">★ {mySpot.avgStarRating}</span>
            <span>• {mySpot.numReviews} Reviews</span>
            <span className="spot-details-location"> {mySpot.city}, {mySpot.state}, {mySpot.country}</span>
          </div>
        </div>
        <div className="spot-details-image-list">
            {imageList.map(img => (
              <img key={img.id} src={img.url} alt={img.name}></img>
            ))}
        </div>
        <div className="spot-details-description">
          {mySpot.description}
        </div>
        <div>
          {currentUser && currentUser.id === mySpot.Owner.id && (
            <div className="listing-owner-container">
              <div className="spot-owner-div">
                <Link 
                className="spot-owner-links" 
                to={`/spots/${mySpot.id}/edit`}>Edit your listing</Link>
              </div>
              <div className="spot-owner-div">
                <Link className="spot-owner-links" 
                to={`/spots/${mySpot.id}/delete`}>Delete your listing</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {(!!Object.values(reviewsObj).length) && (
        <ReviewsBySpot reviews={reviewsObj} />
      )}
      <div className="create-new-review-box">
        {currentUser && currentUser.id !== mySpot.Owner.id && (
          <Link 
          className="create-new-review-link" to={`/spots/${mySpot.id}/review/new`}>Create A Review</Link>
        )}
      </div>
    </div>
  )
}

export default ViewSpotDetails;
