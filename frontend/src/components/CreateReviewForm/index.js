import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';

function CreateReviewForm () {
  
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const sessionUser = useSelector((state) => state.session.user)
  
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1)
  const [inputErrors, setInputErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState([]);
  
  const updateReview = (e) => setReview(e.target.value)
  const updateStars = (e) => setStars(e.target.value)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      review,
      stars: parseInt(stars)
    }
    
    console.log("Am I a number? ", parseInt(stars))
    
    dispatch(createReviewThunk(payload, spotId))
    
    history.push(`/spots/${spotId}`)
  }
  
  return (
    <>
    <form>
      <h2 className="create-review-header">Share some thoughts on your stay here!</h2>
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
          onChange={updateStars} >
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
    </>
  )
}

export default CreateReviewForm;
