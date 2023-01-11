import { csrfFetch } from './csrf';

const GET_BOOKINGS = 'bookings/getBookings';

// Action Creators
const getBookingsAction = (bookings) => {
  return {
    type: GET_BOOKINGS,
    bookings
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

const bookingsReducer = (state = { spotBookings: {}, userBookings: {} }, action) => {

  switch (action.type) {
    default:
      return state;
  }
}

export default bookingsReducer;
