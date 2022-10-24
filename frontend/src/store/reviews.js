import { csrfFetch } from './csrf';

// 
const LOAD_SPOT_REVIEWS = '/review/spot/load';
const LOAD_USER_REVIEWS = '/review/user/load';
const DELETE_REVIEW = "/review/delete";
const CREATE_REVIEW = '/review/create';

// Action Creators
const loadSpotReviews = (reviews) => {

  return {
    type: LOAD_SPOT_REVIEWS,
    reviews
  }
}

const loadUserReviews = (reviews) => {

  return {
    type: LOAD_USER_REVIEWS,
    reviews
  }
}

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  }
}

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}

// Action Thunks

export const loadSpotReviewsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpotReviews(data))
  }
  
  // need to handle error response for new spots without reviews
  // else {
  //   const noData = await response.json()
  //   return noData;
  // }
}

export const loadUserReviewsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/current')

  if (response.ok) {
    const data = await response.json();

    dispatch(loadUserReviews(data))
  }
}

export const createReviewThunk = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  })
  
  if (response.ok) {
    const newReview = await response.json();
    dispatch(createReview(newReview))
  }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  })
  
  if (response.ok) {
    dispatch(deleteReview(reviewId))
  }
}

// ------ Reviews Reducer ------ //

const initialState = {spot: {}, user: {}}

const reviewsReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOAD_SPOT_REVIEWS: {

      const newReviewObj = {
        // don't spread state when loading data!!
        spot: {}
      };

      // console.log(reviewsObj)
      action.reviews.Reviews.forEach(review => {
        newReviewObj.spot[review.id] = review});

      return newReviewObj;
    }

    case LOAD_USER_REVIEWS: {

      const newReviewObj = {
        user: {}
      };

      action.reviews.Reviews.forEach(review => {
        newReviewObj.user[review.id] = review})
      return newReviewObj;
    }
    
    case CREATE_REVIEW: {
      
      // spread state and spread nested spot state as well
      const newReviewObject = {
        ...state,
        spot: {...state.spot}
      }
      
      // create new key from action and set it to value of action.
      newReviewObject.spot[action.review.id] = action.review
      return newReviewObject;
    }
    
    case DELETE_REVIEW: {
      // copy both nested objects
      const newReviewObject = {
        ...state,
        spot: {...state.spot},
        user: {...state.user}
      }
      // delete the id key from both spot and user
      delete newReviewObject.spot[action.reviewId]
      delete newReviewObject.user[action.reviewId]

      return newReviewObject;
    }

    default:
      return state;
  }
}

export default reviewsReducer;
