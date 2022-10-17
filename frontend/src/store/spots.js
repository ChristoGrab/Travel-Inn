import { csrfFetch } from './csrf';

// List of Actions
const LOAD_SPOTS = 'spots/load';
const CREATE_SPOT = 'spots/create';
const DELETE_SPOT = 'spots/delete';
const UPDATE_SPOT = 'spots/update';
const GET_SPOT = 'spots/getOne'
const ADD_IMAGE = 'spots/addImage'

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

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot
  }
}

const addImage = (image) => {
  return {
    type: ADD_IMAGE,
    image
  }
}

// ------ SESSION THUNK CREATORS ------ //

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');

  const data = await response.json();
  dispatch(loadSpots(data));
  console.log("Data returned from GetAllSpots: ", data);
  return data;
}

export const getOneSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`)

  const data = await response.json();
  dispatch(getSpot(data))
  return data;
}

const initialState = { spots: {}, singleSpot: {} }

// ------ SPOTS REDUCER ------ //
const spotsReducer = (state = initialState, action) => {
  
  // don't declare newState here, JS is weird with spread logic and
  // could mutate the original if we are not careful
  
  switch (action.type) {

    case LOAD_SPOTS: {
      // action = spots: { {Spots: [{1:{x}}, {2:{y}}, {3:{z}}]} }
      // action.spots = {Spots: [{1:{x}}, {2:{y}}, {3:{z}}]}
      // action.spots.Spots = [{1:{x}}, {2:{y}}, {3:{z}}]
      const allSpotsObject = {};
      action.spots.Spots.forEach(spot => {
        allSpotsObject[spot.id] = spot;
      })

      return {
        ...state,
        spots: allSpotsObject
      }
    }

    case CREATE_SPOT: {
      
      // create object to update list in allspots
      const allSpotsObject = { 
        ...state.spots, 
        [action.spot.id]: action.spot 
      }
      
      // return copy of state with spots set to allSpots object 
      // and singleSpot set to the action spot.
      return {
        ...state,
        spots: allSpotsObject,
        singleSpot: action.spot
      }
    }

    case GET_SPOT: {
      return {
        ...state,
        singleSpot: action.spot
      }
    }

    case ADD_IMAGE: {
      
      // create object to update singlespot, and its image array
      const singleSpotObject = {
        ...state.singleSpot,
        SpotImages: [...state.singleSpot.SpotImages, action.image]
      }
      
      // return a copy of state with singleSpot set to our mutated
      // object
      return {
        ...state,
        singleSpot: singleSpotObject
      }
    }
    
    default:
      return state;
  }
}

export default spotsReducer;

