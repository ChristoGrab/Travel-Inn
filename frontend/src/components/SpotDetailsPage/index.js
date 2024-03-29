import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOneSpot } from '../../store/spots';
import { clearSpot } from '../../store/spots'
import ReviewsBySpot from './SpotReviews'
import ReservationBox from '../Bookings/ReservationBox';
import ImageForm from '../Upload/ImageForm';
import noImage from '../../assets/no-image-icon.png';
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
      <section className="spot-page-section-1">
        <div className="spot-details-header">
          <div className="spot-details-title">{spot.name}</div>
          <div className="spot-details-subtitle">
            <span className="spot-details-stars">★ {spot.avgStarRating}</span>
            <span>• {spot.numReviews} Reviews</span>
            .
            <span><i className="fa-solid fa-medal" /> Superhost</span>
            .
            <span className="spot-details-location"> {spot.city}, {spot.state}, {spot.country}</span>
          </div>
        </div>
        
        <div className="spot-details-image-list">
          <img src={imageList[0].url}></img>
          {imageList[1]?.url
            ? <img src={imageList[1]?.url} alt={spot.name} />
            : <div className="no-image-container">
              <img className="no-image" src={noImage} alt={"an empty container"}/>
            </div>
          }
          {imageList[2]?.url
            ? <img src={imageList[2]?.url} alt={spot.name} />
            : <div className="no-image-container">
              <img className="no-image" src={noImage} alt={"an empty container"}/>
            </div>
          }
          {imageList[3]?.url
            ? <img src={imageList[3]?.url} alt={spot.name}/>
            : <div className="no-image-container">
              <img className="no-image" src={noImage} alt={"an empty container"}/>
            </div>
          }
          {imageList[4]?.url
            ? <img src={imageList[4]?.url} alt={spot.name} />
            : <div className="no-image-container">
              <img className="no-image" src={noImage} alt={"an empty container"}/>
            </div>
          }
        </div>
      </section>

      <section className="spot-page-section-2">
        <div className="spot-page-section-2-left">
          <div className="spot-page-box">
          <span className="hosted-by">Hosted by {spot.Owner.firstName}</span>
          </div>
          <div className="spot-page-box bold">
            <span className='spot-page-icon'><i className="fa-regular fa-calendar-xmark" /> Free cancellation until 24 hours before check-in</span>
            <span className='spot-page-icon'><i className="fa-solid fa-wifi" /> Free Wi-Fi</span>
            <span className='spot-page-icon'><i className="fa-solid fa-door-open" /> Self Check-In</span>
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
              <ImageForm />
            </div>
            : <ReservationBox spot={spot} />
          }
        </div>
      </section>

      <section className="spot-page-section-3">
        <ReviewsBySpot spotId={spot.id} currentUser={currentUser} spotOwnerId={spot.Owner.id} averageRating={spot.avgStarRating} />
      </section>

        <section className="spot-page-section-4">
          {currentUser && currentUser.id === spot.Owner.id
          ? <h2>Your listing location</h2>
          : <h2>Where you'll be</h2>
          }     
          For security reasons, locations are approximate. Your host will provide exact address before check-in.
          <Map address={`${spot.city}, ${spot.state}`} />
          <span className="bold">{spot.city}, {spot.state}, {spot.country}</span>
        </section>
        
      <Footer />
    </div>
  )
}

export default SpotDetails;
