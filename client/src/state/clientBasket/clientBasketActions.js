import axios from 'axios';

export const ADD_PRODUCT_TO_BASKET = 'ADD_PRODUCT_TO_BASKET';
export const REMOVE_PRODUCT_FROM_BASKET = 'REMOVE_PRODUCT_FROM_BASKET';
export const CONFIRM_ORDER = 'CONFIRM_ORDER';
export const ADD_PERSONAL_DATA = 'ADD_PERSONAL_DATA';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';



export const addProductToBasket = test => {
  return {
    type: ADD_PRODUCT_TO_BASKET,
    payload: {
      test,
    },
  }
}

export const removeProductFromBasket = testId => {
  return {
    type: REMOVE_PRODUCT_FROM_BASKET,
    payload: {
      testId,
    },
  }
}

export const addPersonalData = personalData => {
  return {
    type: ADD_PERSONAL_DATA,
    payload: {
      personalData,
    },
  }
}

export const confirmOrder = (personalData, products) => async dispatch => {
  return axios.post('/orders', { personalData, products })
    .then(response => {
      console.log(response);

      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: PLACE_ORDER_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}