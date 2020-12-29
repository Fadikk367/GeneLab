import {
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
} from './clientBasketActions';


const initialState = {
  products: []
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
    default:
      return state;
  }
}

export default clientBasketReducer;