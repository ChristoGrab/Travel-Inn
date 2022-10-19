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
  console.log("I have been sent")
  if (response.ok) {
    const data = await response.json();
    console.log("this is the data being sent to action: ", data)
    dispatch(loadSpotReviews(data))
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

    default:
      return state;
  }
}

export default reviewsReducer;
