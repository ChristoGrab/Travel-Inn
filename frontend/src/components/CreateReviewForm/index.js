import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';
import ReviewStars from "./ReviewStars"
import "./CreateReviewForm.css"

function CreateReviewForm() {

  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user)

  // list of state variables
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0)
  const [inputErrors, setInputErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // list of input functions
  const updateReview = (e) => setReview(e.target.value)
  const updateStars = (e) => setStars(e.target.value)

  // list of input errors
  useEffect(() => {
    let errors = []
    if (review.length <= 5) errors.push("Please provide some specific feedback for your host!");
    if (review.toLowerCase().includes("fuck")
      || review.toLowerCase().includes("shit")) errors.push("Please refrain from using inappropriate language")
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

  return (
    <>
      <div className="create-review-form-greeting">
      <h1>Share Your Experience!</h1>
      <div>
        Leaving some thoughts and insights on your stay here will help other guests get a better idea of what to expect, and will help your host improve their listing for future guests.
      </div>
      </div>
      
      <form className='create-review-form'>

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
          Rate your stay
        <div className="create-hover">
          <ReviewStars stars={stars} setStars={setStars} />
        </div>
        </div>
        <div className="form-instructions">
          Now share some thoughts on your stay. Try to be specific and helpful! Constructive feedback is a great way to help the Travel-Inn community continue to grow and improve.
        </div>
        <textarea
          className="create-review-textarea"
          type="text"
          required
          placeholder='Write your review here...'
          value={review}
          onChange={updateReview} />
        <button className='submit-review-button'
          onClick={handleSubmit}>Submit Review</button>
      </form>
    </>
  )
}

export default CreateReviewForm;
