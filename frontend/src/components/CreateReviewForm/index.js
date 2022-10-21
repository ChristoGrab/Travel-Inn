import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';

function CreateReviewForm() {

  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user)

  // list of state variables
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(3)
  const [inputErrors, setInputErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // list of input functions
  const updateReview = (e) => setReview(e.target.value)
  const updateStars = (e) => setStars(e.target.value)

  // list of input errors
  useEffect(() => {
    let errors = []
    if (review.length <= 5) errors.push("Please provide some specific feedback for your host!");
    setInputErrors(errors)
  }, [review])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true)
    
    if (inputErrors.length) return;

    const payload = {
      review,
      stars: parseInt(stars)
    }

    dispatch(createReviewThunk(payload, spotId))

    history.push(`/spots/${spotId}`)
  }

  console.log("Form submitted status on page load: ", formSubmitted)
  return (
    <div>
      <form>
        <div
          className="create-review-form-greeting">
          Share some thoughts on your stay here!
        </div>
        {formSubmitted && <div className="create-review-errors">
          <ul className="spot-errors-list">
            {inputErrors.map((error, idx) => (
              <li key={idx}>
                {error}
              </li>
            ))}
          </ul>
          </div>}
        <label>
          Review
          <input
            type="text"
            required
            value={review}
            onChange={updateReview} />
        </label>
        <label>
          Stars
          <select
            id="stars"
            value={stars}
            onChange={updateStars}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <button className='submit-review-button'
          onClick={handleSubmit}>Submit Review</button>
      </form>
    </div>
  )
}

export default CreateReviewForm;
