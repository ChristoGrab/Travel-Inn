import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOneSpot } from '../../store/spots';
import './ViewSpotDetails.css';

function ViewSpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  
  //set a state variable to prevent page loading before data is ready
  //to avoid rendering previous state data
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    dispatch(getOneSpot(spotId)).then(() => setDataLoaded(true))
  }, [dispatch, dataLoaded, spotId])

  const mySpot = useSelector(state => state.spots.singleSpot);
  const currentUser = useSelector(state => state.session.user);

  let imageList = [];
  if (!mySpot.Owner) return null;
  if (!currentUser.id) return null;

  // need to create a conditional for mapping images, otherwise
  // runs into a timing issue with dispatch.
  if (mySpot.SpotImages) {
    mySpot.SpotImages.forEach(img => imageList.push(img))
  }

  let currentUserId;
  let spotOwnerId;

  if (currentUser.id) currentUserId = currentUser.id;
  if (mySpot.Owner.id) spotOwnerId = mySpot.Owner.id;


  return (
    <>
    {dataLoaded && (
    <div className="spot-details-container">
      <div className="spot-details-header">
        <div>{mySpot.name}</div>
        <div className="spot-details-">
          <div>★ {mySpot.avgStarRating}</div>
          <div>{mySpot.numReviews}</div>
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
        {currentUserId && currentUserId === spotOwnerId && (
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
    </>
  )
}

export default ViewSpotDetails;
