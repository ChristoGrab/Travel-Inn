import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadSpotReviewsThunk, updateReviewThunk, clearReviews } from '../../store/reviews';
import ReviewStars from '../CreateReviewForm/ReviewStars';
import LoadingScreen from '../LoadingScreen';
import './UpdateReviewForm.css';

function UpdateReviewForm() {

  const { spotId, reviewId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const review = useSelector(state => state.reviews.spot[reviewId])


  useEffect(() => {
    dispatch(loadSpotReviewsThunk(spotId))
    
    return (() => dispatch(clearReviews()))

  }, [dispatch, spotId])

  // list of state variables
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(null);
  const [inputErrors, setInputErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // list of input functions
  const updateReview = (e) => setReviewText(e.target.value)
  const updateStars = (e) => setStars(e.target.value)
  
  useEffect(() => {
    if (review) {
      setReviewText(review.review)
      setStars(review.stars)
    }
  }, [review])

  // list of input errors
  useEffect(() => {
    let errors = []
    if (reviewText.length <= 5) errors.push("Please provide some specific feedback for your host!");
    if (reviewText.toLowerCase().includes("fuck")
    || reviewText.toLowerCase().includes("shit")) errors.push("Please refrain from using inappropriate language")
    setInputErrors(errors)
  }, [reviewText])


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setShowErrors(true)
    if (inputErrors.length) return;

    const payload = {
      review: reviewText,
      stars: parseInt(stars)
    }
    
    setFormSubmitted(true);
    


    dispatch(updateReviewThunk(payload, reviewId))
    .then(() => history.goBack())
  }
  
  if (formSubmitted) return <LoadingScreen />;

  return (
    <div className="update-review-form-container">
      <form className='create-review-form'>
        <div className="create-review-form-greeting">
          <h2>Want to make some changes to your review? No problem!</h2>
        </div>
        {showErrors && <div className="create-review-errors">
          <div className="spot-errors-list">
            {inputErrors.map((error, idx) => (
              <li className="form-error" key={idx}>
                {error}
              </li>
            ))}
          </div>
          </div>}
        <div className="create-review-stars">
          Rating
        <div className="create-hover">
          <ReviewStars stars={stars} setStars={setStars} />
        </div>
        </div>
        <textarea
          className="create-review-textarea"
            type="text"
            required
            value={reviewText}
            onChange={updateReview} />
        <button className='submit-button'
          onClick={handleSubmit}>Submit Review</button>
      </form>
    </div>
  )
}

export default UpdateReviewForm;
