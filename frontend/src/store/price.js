import { calculateTotalPrice } from '../functions/calculateTotalPrice';

const GET_PRICE = 'price/GET_PRICE';

const getPrice = (booking) => ({
  type: GET_PRICE,
  booking
})

export const calculatePriceThunk = (booking) => async (dispatch) => {

  const { startDate, endDate, price } = booking

  const total = calculateTotalPrice(startDate, endDate, price)

  dispatch(getPrice(total))
}

const initialState = { price: null }

const priceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRICE:
      return { price: action.booking }
    default:
      return state;
  }
}

export default priceReducer;
