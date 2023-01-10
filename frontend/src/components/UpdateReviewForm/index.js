import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateReviewThunk } from '../../store/reviews';
import LoadingScreen from '../LoadingScreen';
import './UpdateReviewForm.css';

function UpdateReviewForm({ review }) {

  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

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
    
    setFormSubmitted(true)

    dispatch(updateReviewThunk(payload, review.review.id))
    .then(() => history.push(`/spots/${spotId}`))
  }
  
  if (formSubmitted) return <LoadingScreen />;

  return (
    <div className="update-review-form-container">
      <form className='create-review-form'>
        <div
          className="create-review-form-greeting">
          Share some thoughts on your stay here!
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
          <textarea
          className="create-review-textarea"
            type="text"
            required
            value={reviewText}
            onChange={updateReview} />
        <label className="create-review-stars">
          Rating
          <select
          className="review-stars-dropdown"
            id="stars"
            value={stars}
            onChange={updateStars}>
            <option value={1}>1 - Terrible</option>
            <option value={2}>2 - Bad</option>
            <option value={3}>3 - Fair</option>
            <option value={4}>4 - Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </label>
        <button className='submit-review-button'
          onClick={handleSubmit}>Submit Review</button>
      </form>
    </div>
  )
}

export default UpdateReviewForm;
