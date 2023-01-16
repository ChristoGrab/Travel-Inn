import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateReviewThunk } from '../../store/reviews';
import ReviewStars from '../CreateReviewForm/ReviewStars';
import LoadingScreen from '../LoadingScreen';
import './UpdateReviewForm.css';

function UpdateReviewForm() {

  const { reviewId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const review = useSelector(state => state.reviews.spot[reviewId])
  const spotId = review.spotId
  
  
  // list of state variables
  const [reviewText, setReviewText] = useState(review.review);
  const [stars, setStars] = useState(review.stars)
  const [inputErrors, setInputErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // list of input functions
  const updateReview = (e) => setReviewText(e.target.value)
  const updateStars = (e) => setStars(e.target.value)

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
    
    if (inputErrors.length) return;

    const payload = {
      review: reviewText,
      stars: parseInt(stars)
    }
    
    console.log(review.id)
    
    setFormSubmitted(true)

    dispatch(updateReviewThunk(payload, review.id))
    .then(() => history.push(`/spots/${spotId}`))
  }
  
  if (formSubmitted) return <LoadingScreen />;

  return (
    <div className="update-review-form-container">
      <form className='create-review-form'>
        <div
          className="create-review-form-greeting">
          Want to make some changes to your review? No problem!
        </div>
        {formSubmitted && <div className="create-review-errors">
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
