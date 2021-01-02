export const ADD_PRODUCT_TO_BASKET = 'ADD_PRODUCT_TO_BASKET';
export const REMOVE_PRODUCT_FROM_BASKET = 'REMOVE_PRODUCT_FROM_BASKET';
export const CONFIRM_ORDER = 'CONFIRM_ORDER';
export const ADD_PERSONAL_DATA = 'ADD_PERSONAL_DATA';


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