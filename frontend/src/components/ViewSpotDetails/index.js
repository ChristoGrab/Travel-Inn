import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOneSpot } from '../../store/spots';
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
      .then(() => dispatch(loadSpotReviewsThunk(spotId)))
      .then(() => setDataLoaded(true))
      .catch((e) => console.log(e))
  }, [dispatch, dataLoaded, spotId])

  const mySpot = useSelector(state => state.spots.singleSpot);
  const currentUser = useSelector(state => state.session.user);
  const reviewsObj = useSelector(state => state.reviews.spot)
  

  console.log("Spot data from useSelector: ", mySpot);
  console.log("User data from useSelector: ", currentUser)
  console.log("Reviews data from useSelector: ", reviewsObj)

  let imageList = [];

  // need to create a conditional for mapping images, otherwise
  // runs into a timing issue with dispatch.
  if (mySpot.SpotImages) {
    mySpot.SpotImages.forEach(img => imageList.push(img))
  }

  console.log("THis is the reviewsObj in my component: ", reviewsObj)


  return (
    <>
      {dataLoaded && (
        <div className="spot-details-container">
          <div className="spot-details-header">
            <div>{mySpot.name}</div>
            <div className="spot-details-">
              <div>★ {mySpot.avgStarRating}</div>
              <div>{mySpot.numReviews} Ratings</div>
              <div>{mySpot.city}, {mySpot.state}, {mySpot.country}</div>
            </div>
          </div>
          <div className="spot-details-image-list-div">
            <ul className='spot-details-image-list'>
              {imageList.map(img => (
                <img key={img.id} src={img.url} alt={img.name}></img>
              ))}
            </ul>
          </div>
          <div className="spot-details-description">
            {mySpot.description}
          </div>
          <div>
            {currentUser && currentUser.id === mySpot.Owner.id && (
              <div className="listing-owner-container">
                <div className="edit-listing-button">
                  <Link to={`/spots/${mySpot.id}/edit`}>Edit your listing</Link>
                </div>
                <div className="delete-listing-button">
                  <Link to={`/spots/${mySpot.id}/delete`}>Delete your listing</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {dataLoaded && reviewsObj && (
        <ReviewsBySpot reviews={reviewsObj} />
      )}
    </>
  )
}

export default ViewSpotDetails;
