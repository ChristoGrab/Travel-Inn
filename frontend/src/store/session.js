// frontend/src/store/session.js
import { csrfFetch } from './csrf';

// list of actions here
const START_SESSION = 'session/start';
const STOP_SESSION = 'session/stop';

// ------ SESSION ACTION CREATORS ------ //
const setUser = (user) => {
  console.log("This is user being passed in to action creator: ", user)
  return {
    type: START_SESSION,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: STOP_SESSION,
  };
};

// ------ SESSION THUNK CREATORS ------ //
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  console.log("Credentials being sent: ", credential, password)
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    }),
  });
  
  const data = await response.json();
  console.log("Data being returned: ", data)
  console.log("Data.user being returned: ", data.user)
  dispatch(setUser(data));
  console.log("User being returned from data: ", data.user)
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data));
  return response;
}

const initialState = { user: null };

// ------ SESSION REDUCER ------ //
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case START_SESSION:
      console.log("Prev state: ", state)
      newState = Object.assign({}, state);
      console.log("New state: ", state)
      newState.user = action.payload;
      console.log("User: ", action.user)
      return newState;
      
    case STOP_SESSION:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
      
    default:
      return state;
  }
};

export default sessionReducer;