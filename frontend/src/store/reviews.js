import { csrfFetch } from './csrf';

// 
const LOAD_SPOT_REVIEWS = '/review/spot/load';
const LOAD_USER_REVIEWS = '/review/user/load';
const DELETE_REVIEW = "/review/delete";
const CREATE_REVIEW = '/review/create';

// Action Creators
const loadSpotReviews = (reviews) => {
  console.log("this is the data being sent to the reducer: ", reviews)
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

const deleteSpot = (id) => {
  return {
    type: DELETE_REVIEW,
    id
  }
}

// Action Thunks

export const loadSpotReviewsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if (response.ok) {
    const data = await response.json();
    console.log("Successful review data: ", data)
    dispatch(loadSpotReviews(data))
  }
  
  // need to handle error response for new spots without reviews
  else {
    console.log("No reviews found...")
    const noData = await response.json()
    console.log("No review found response: ", noData)
    return noData;
  }

}

export const loadUserReviewsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/current')
  console.log("This is my response for loading user reviews: ", response)

  if (response.ok) {
    const data = await response.json();

    dispatch(loadUserReviews(data))
  }
}


// ------ Reviews Reducer ------ //

const initialState = {spot: {}, user: {}}

const reviewsReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOAD_SPOT_REVIEWS: {

      // create an object, spread state, overwrite spot
      // this removes memory reference? Still don't
      // fully understand why just spreading will mutate
      // original...

      const reviewsObj = {
        ...state,
        spot: {}
      };

      // console.log(reviewsObj)
      action.reviews.Reviews.forEach(review => {
        reviewsObj.spot[review.id] = review});

      return reviewsObj;
    }

    case LOAD_USER_REVIEWS: {

      const reviewsObj = {
        ...state,
        user: {}
      };

      action.reviews.Reviews.forEach(review => {
        reviewsObj.user[review.id] = review})
        console.log("user reviews in state: ", reviewsObj)
      return reviewsObj;
    }
    
    case CREATE_REVIEW: {
      return state;
    }
    
    case DELETE_REVIEW: {
      return state;
    }

    default:
      return state;
  }
}

export default reviewsReducer;
