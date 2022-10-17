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

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot
  };
};

// ------ SESSION THUNK CREATORS ------ //

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  

  const data = await response.json();
  dispatch(loadSpots(data));
  console.log("Data returned from GetAllSpots: ", data);
  return data;
}

const initialState = { Spots: {} }

// ------ SPOTS REDUCER ------ //
const spotsReducer = (state = initialState, action) => {
  
  let newState = { ...state }
  
  switch (action.type) {
    
    case LOAD_SPOTS: {
      
      // action = spots: { {Spots: [{1:{x}}, {2:{y}}, {3:{z}}]} }
      // action.spots = {Spots: [{1:{x}}, {2:{y}}, {3:{z}}]}
      // action.spots.Spots = [{1:{x}}, {2:{y}}, {3:{z}}]
      action.spots.Spots.forEach(spot => {
        newState.Spots[spot.id] = spot
        
      //  newState = { Spots: {} }
      // newState.Spots.id = {1: {name, location, etc}}
        
      })
      console.log("Load spots: ", newState)
      return newState;    
  }
  
    case CREATE_SPOT: {
      
    // action = spot: { spo}
      newState.Spots[action.spot.id] = action.spot
    }
    
    default:
      return state;
  }
}

export default spotsReducer;
