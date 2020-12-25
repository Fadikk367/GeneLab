import axios from 'axios';

// export const GET_TEST_CATEGORIES = 'GET_TEST_CATEGORIES';
// export const GET_TEST_CATEGORIES_REQUEST = 'GET_TEST_CATEGORIES_REQUEST';
export const GET_TEST_CATEGORIES_SUCCESS = 'GET_TEST_CATEGORIES_SUCCESS';
export const GET_TEST_CATEGORIES_FAILURE = 'GET_TEST_CATEGORIES_FAILURE';

// export const CREATE_TEST_CATEGORY = 'CREATE_TEST_CATEGORY';
// export const CREATE_TEST_CATEGORY_REQUEST = 'CREATE_TEST_CATEGORY_REQUEST';
export const CREATE_TEST_CATEGORY_SUCCESS = 'CREATE_TEST_CATEGORY_SUCCESS';
export const CREATE_TEST_CATEGORY_FAILURE = 'CREATE_TEST_CATEGORY_FAILURE';

// export const UPDATE_TEST_CATEGORY = 'UPDATE_TEST_CATEGORY';
// export const UPDATE_TEST_CATEGORY_REQUEST = 'UPDATE_TEST_CATEGORY_REQUEST';
export const UPDATE_TEST_CATEGORY_SUCCESS = 'UPDATE_TEST_CATEGORY_SUCCESS';
export const UPDATE_TEST_CATEGORY_FAILURE = 'UPDATE_TEST_CATEGORY_FAILURE';

// export const DELETE_TEST_CATEGORY = 'DELETE_TEST_CATEGORY';
// export const DELETE_TEST_CATEGORY_REQUEST = 'DELETE_TEST_CATEGORY_REQUEST';
export const DELETE_TEST_CATEGORY_SUCCESS = 'DELETE_TEST_CATEGORY_SUCCESS';
export const DELETE_TEST_CATEGORY_FAILURE = 'DELETE_TEST_CATEGORY_FAILURE';


export const getAllTestCategories = () => async dispatch => {
  return axios.get('/categories')
    .then(response => {
      console.log(response);

      dispatch({
        type: GET_TEST_CATEGORIES_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: GET_TEST_CATEGORIES_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const createTestCategory = (categoryName, categoryDescription) => async dispatch => {
  return axios.post('/categories', { categoryName, categoryDescription })
    .then(response => {
      console.log(response);

      dispatch({
        type: CREATE_TEST_CATEGORY_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_TEST_CATEGORY_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const deleteTestCategory = categoryId => async dispatch => {
  return axios.delete(`/categories/${categoryId}`)
    .then(response => {
      console.log(response);

      dispatch({
        type: DELETE_TEST_CATEGORY_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: DELETE_TEST_CATEGORY_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}