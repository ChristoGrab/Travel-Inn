import { csrfFetch } from './csrf';

const LOAD_API_KEY = 'maps/LOAD_API_KEY';

const loadApiKey = (key) => ({
    type: LOAD_API_KEY,
    payload: key,
});

export const getKey = () => async (dispatch) => {
    const res = await csrfFetch('/api/map/key', {
        method: 'POST',
    });
    const data = await res.json();
    dispatch(loadApiKey(data.googleMapsAPIKey));
};

const initialState = { key: null };

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_API_KEY:
            return { key: action.payload };
        default:
            return state;
    }
};

export default mapReducer;
