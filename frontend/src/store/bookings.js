import { csrfFetch } from './csrf';

const GET_BOOKINGS = 'bookings/get';
const GET_USER_BOOKINGS = 'bookings/get/user';
const CREATE_BOOKING = "bookings/create";
const DELETE_BOOKING = "bookings/delete";
const CLEAR_BOOKINGS = "bookings/clear";
const GET_RESTRICTED_BOOKINGS = "bookings/restricted";

// Action Creators
const getBookingsAction = (bookings) => {
  return {
    type: GET_BOOKINGS,
    bookings
  }
}

const getUserBookingsAction = (bookings) => {
  return {
    type: GET_USER_BOOKINGS,
    bookings
  }
}

const getRestrictedDatesAction = (bookings) => {
  return {
    type: GET_RESTRICTED_BOOKINGS,
    bookings
  }
}

const postBookingAction = (booking) => {
  return {
    type: CREATE_BOOKING,
    booking
  }
}

const deleteBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING,
    bookingId
  }
}

export const clearBookingsAction = () => {
  return {
    type: CLEAR_BOOKINGS
  }
}

export const getBookingsThunk = (spotId) => async (dispatch) => {
  
  // fetch all bookings for a spot
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

  // get the json version of the response
  const data = await response.json();

  // if the response is ok, dispatch the action with the bookings
  if (response.ok) {
    dispatch(getBookingsAction(data))
  }

  return data;
}

export const getUserBookingsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/bookings/current');
  
  const data = await response.json();
  
  if (response.ok) {
    dispatch(getUserBookingsAction(data))
    return data;
  }
}

export const getRestrictedDatesThunk = (spotId, bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/restricted/${spotId}/${bookingId}`)
  
  const data = await response.json();
  
  if (response.ok) {
    dispatch(getRestrictedDatesAction(data))
    return data;
  }
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
    const errorData = await response.json();
    return errorData;
  };
}

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(deleteBooking(bookingId))
    return data;
  } else {
    const data = await response.json()
    return data;
  }
}

export const updateBookingThunk = (booking, id) => async (dispatch) => {
  
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(booking)
  })
  
  // if the response is ok, dispatch the action with the bookings
  if (response.ok) {
    const data = await response.json()
    dispatch(postBookingAction(data))
    return data;
    
  // if the response is not ok, return the error data
  } else {
    const data = await response.json()
    return data;
  }
}

// The Bookings Reducer contains all the bookings for a spot, all the bookings for a user, 
// and all the bookings that are restricted for a spot
const bookingsReducer = (state = { spotBookings: {}, userBookings: {}, restricted: [] }, action) => {
  
  switch (action.type) {
    
    case GET_BOOKINGS: {
      const newState = {
        ...state,
        spotBookings: {...state.spotBookings},
        userBookings: {...state.userBookings},
        restricted: [...state.restricted]
      }
      

      
      action.bookings.Bookings.forEach(booking => {
        newState.spotBookings[booking.id] = booking;
      })
      

      
    return newState;
    }
    
    case GET_USER_BOOKINGS: {
      const newState = {
        ...state,
        spotBookings: {...state.spotBookings},
        userBookings: {...state.userBookings},
        restricted: [...state.restricted]
      }
      action.bookings.Bookings.forEach(booking => {
        newState.userBookings[booking.id] = booking;
      })
      
      return newState;
    }
      
    case GET_RESTRICTED_BOOKINGS: {
      const newState = {
        ...state,
        spotBookings: {...state.spotBookings},
        userBookings: {...state.userBookings},
        restricted: action.bookings.Bookings
      }
      
      return newState;
    }
      

    
    case CREATE_BOOKING: {
      const newState = { 
        ...state,
        spotBookings: {...state.spotBookings},
        userBookings: {...state.userBookings},
        restricted: [...state.restricted]
    }
    
    newState.spotBookings[action.booking.id] = action.booking
    return newState;
  }
  
  case DELETE_BOOKING: {
    const newState = {
      ...state,
      spotBookings: {...state.spotBookings},
      userBookings: {...state.userBookings},
      restricted: [...state.restricted]
    }

    delete newState.userBookings[action.bookingId]
    return newState;
  }
  
  
  case CLEAR_BOOKINGS: {

    return {
      ...state,
      spotBookings: {},
      userBookings: {},
      restricted: []
    }
  }

    default:
      return state;
  }
}

export default bookingsReducer;
