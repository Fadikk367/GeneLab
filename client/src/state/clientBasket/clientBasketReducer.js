import {
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
  ADD_PERSONAL_DATA,
  CONFIRM_ORDER,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  SELECT_POINT,
  CLEAR_ORDER_INFORMATIONS,
} from './clientBasketActions';


const initialState = {
  products: [],
  isLoading: false,
  placedOrderDetails: null,
}

const clientBasketReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PRODUCT_TO_BASKET:
      const addedProduct = action.payload.test;

      return {
        ...state,
        products: [...state.products, addedProduct]
      }
    case REMOVE_PRODUCT_FROM_BASKET:
      const removedProductId = action.payload.testId;
      return {
        ...state,
        products: state.products.filter(product => product.id !== removedProductId)
      }
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: [],
        placedOrderDetails: action.payload.createdOrder,
      }
    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
      }
    case CLEAR_ORDER_INFORMATIONS:
      return {
        ...state,
        placedOrderDetails: null,
      }
    default:
      return state;
  }
}

export default clientBasketReducer;