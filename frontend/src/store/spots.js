import { csrfFetch } from './csrf';

// List of Actions
const GET_SPOTS = 'spots/load';
const CREATE_SPOT = 'spots/create';
const DELETE_SPOT = 'spots/delete';
const UPDATE_SPOT = 'spots/update';
const GET_SPOT = 'spots/getOne';
const ADD_IMAGE = 'spots/addImage';
const CLEAR_SPOT = 'spots/clear';

// ------ SESSION ACTION CREATORS ------ //
const getSpotsAction = (spots) => {
  return {
    type: GET_SPOTS,
    spots
  };
};

const createSpotAction = (spot) => {
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

const editSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot
  }
}

const deleteSpot = (id) => {
  return {
    type: DELETE_SPOT,
    id
  }
}

const addImage = (image) => {
  return {
    type: ADD_IMAGE,
    image
  }
}

export const clearSpot = () => {
  return {
    type: CLEAR_SPOT
  }
}

// ------ SESSION THUNK CREATORS ------ //

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');

  const data = await response.json();
  dispatch(getSpotsAction(data));
  return data;
}

export const getOneSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`)

  const data = await response.json();
  
  if (response.ok) {
    dispatch(getSpot(data))
    return data
  }
}

export const createNewSpot = (spot) => async (dispatch) => {
  
  const response = await csrfFetch('/api/spots', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(spot)
  })


  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createSpotAction(newSpot))
    return newSpot
    
  } else {
    const errorData = await response.json();
    return errorData;
  }
}

export const updateSpot = (spotData, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(spotData)
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(editSpot(data))
  } else {
    const errorData = await response.json();
    return errorData;
  };
}

export const deleteSpotThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE"
  })
  
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpot(id))
    return data;
  }
}

export const createImageThunk = (payload, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  
  
  console.log(response.json())
  
  if (response.ok) {
    const newImage = await response.json();
    console.log("New image in image thunk: ", newImage)
    dispatch(addImage(newImage))
  }
}

const initialState = { spotsList: {}, singleSpot: {} }

// ------ SPOTS REDUCER ------ //
const spotsReducer = (state = initialState, action) => {
  // don't declare newState here, JS is weird with spread logic and
  // could mutate the original if we are not careful
  
  switch (action.type) {

    case GET_SPOTS: {
      const allSpotsObject = {};
      action.spots.Spots.forEach(spot => {
        allSpotsObject[spot.id] = spot;
      })

      return {
        ...state,
        spotsList: allSpotsObject
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
        spotsList: allSpotsObject,
        singleSpot: action.spot
      }
    }

    case GET_SPOT: {

      return {
        ...state,
        singleSpot: action.spot
      }
    }
    
    case UPDATE_SPOT: {
      const allSpotsObject = {
        ...state.spots,
        [action.spot.id]: action.spot
      }
    
    return {
      ...state,
      spotsList: allSpotsObject,
      singleSpot: action.spot
    }
  }
  
  case DELETE_SPOT: {
    const allSpotsObject = {
      ...state.spots
    }
    delete allSpotsObject[action.id]
    return {
      ...state,
        spotsList: allSpotsObject,
        singleSpot: {}
    }
  }

    case ADD_IMAGE: {
      
      // create object to update singlespot, and its image array
      const singleSpotObject = {
        ...state.singleSpot,
        SpotImages: [action.image]
      }
      
      // return a copy of state with singleSpot set to our mutated
      // object
      return {
        ...state,
        singleSpot: singleSpotObject
      }
    }
    
    case CLEAR_SPOT: {
      return {
        ...state,
        singleSpot: {}
      }
    }
    
    default:
      return state;
  }
}

export default spotsReducer;

