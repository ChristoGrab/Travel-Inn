import { csrfFetch } from './csrf';

// List of Actions
const LOAD_SPOTS = 'spots/load';
const CREATE_SPOT = 'spots/create';
const DELETE_SPOT = 'spots/delete';
const UPDATE_SPOT = 'spots/update';

// ------ SESSION ACTION CREATORS ------ //
const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  };
};

// ------ SESSION THUNK CREATORS ------ //

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  
  const data = await response.json();
  dispatch(loadSpots(data));
  return response;
}

const initialState = { Spots: {} }

// ------ SPOTS REDUCER ------ //
const spotsReducer = (state = initialState, action) => {
  
  let newState = { ...state }
  
  switch (action.type) {
    
    case LOAD_SPOTS:
      newState['allSpots'] = { ...action.spots }
      
      return newState;
      
    default:
      return state;
  }
}
