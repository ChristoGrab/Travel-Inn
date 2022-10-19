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
  const [stars, setStars] = useState("")
  const [inputErrors, setInputErrors] = useState([]);
  
  const updateReview = (e) => (e.target.value)
  const updateStars = (e) => (e.target.value)
  
  return (
    <>
    <form>
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
    </form>
    </>
  )
}
