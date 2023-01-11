import { csrfFetch } from './csrf';

const GET_BOOKINGS = 'bookings/get';
const CREATE_BOOKING = "bookings/create";

// Action Creators
const getBookingsAction = (bookings) => {
  return {
    type: GET_BOOKINGS,
    bookings
  }
}

const postBookingAction = (booking) => {
  return {
    type: CREATE_BOOKING,
    booking
  }
}

export const getBookingsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  
  const data = await response.json();
  
  if (response.ok) {
    dispatch(getBookingsAction(data))
    return data;
  }

  return data;
}

export const createBookingThunk = (spotId, booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking)
  })
  
  if (response.ok) {
    const data = await response.json();
    dispatch(postBookingAction(data))
    return data
  } else {
    const data = await response.json();
    return data;
  }
}

const bookingsReducer = (state = { spotBookings: {}, userBookings: {} }, action) => {

  switch (action.type) {
    
    case GET_BOOKINGS: {
      const newState = {
        ...state,
        spotBookings: {...state.spotBookings},
        userBookings: {...state.userBookings}
      }
      
      action.bookings.Bookings.forEach(booking => {
        newState.spotBookings[booking.id] = booking;
      })
      
    return newState;
    }
    
    case CREATE_BOOKING: {
      const newState = { 
        ...state,
        spotBookings: {...state.spotBookings},
        userBookings: {...state.userBookings}
    }
    
    newState.spotBookings[action.booking.spotId] = action.booking
    return newState;
  }
    
    default:
      return state;
  }
}

export default bookingsReducer;
