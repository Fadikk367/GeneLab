import axios from 'axios';

// export const GET_EXAMINATIONS = 'GET_EXAMINATIONS';
// export const GET_EXAMINATIONS_REQUEST = 'GET_EXAMINATIONS_REQUEST';
export const GET_EXAMINATIONS_SUCCESS = 'GET_EXAMINATIONS_SUCCESS';
export const GET_EXAMINATIONS_FAILURE = 'GET_EXAMINATIONS_FAILURE';

// export const CREATE_EXAMINATION = 'CREATE_EXAMINATION';
// export const CREATE_EXAMINATION_REQUEST = 'CREATE_EXAMINATION_REQUEST';
export const CREATE_EXAMINATION_SUCCESS = 'CREATE_EXAMINATION_SUCCESS';
export const CREATE_EXAMINATION_FAILURE = 'CREATE_EXAMINATION_FAILURE';

// export const UPDATE_EXAMINATION = 'UPDATE_EXAMINATION';
// export const UPDATE_EXAMINATION_REQUEST = 'UPDATE_EXAMINATION_REQUEST';
export const UPDATE_EXAMINATION_SUCCESS = 'UPDATE_EXAMINATION_SUCCESS';
export const UPDATE_EXAMINATION_FAILURE = 'UPDATE_EXAMINATION_FAILURE';

// export const DELETE_EXAMINATION = 'DELETE_EXAMINATION';
// export const DELETE_EXAMINATION_REQUEST = 'DELETE_EXAMINATION_REQUEST';
export const DELETE_EXAMINATION_SUCCESS = 'DELETE_EXAMINATION_SUCCESS';
export const DELETE_EXAMINATION_FAILURE = 'DELETE_EXAMINATION_FAILURE';


export const GET_EXAMINATIONS_CATEGORIES_SUCCESS = 'GET_EXAMINATIONS_CATEGORIES_SUCCESS';
export const GET_EXAMINATIONS_CATEGORIES_FAILURE = 'GET_EXAMINATIONS_CATEGORIES_FAILURE';

export const CREATE_EXAMINATION_CATEGORY_SUCCESS = 'CREATE_EXAMINATION_CATEGORY_SUCCESS';
export const CREATE_EXAMINATION_CATEGORY_FAILURE = 'CREATE_EXAMINATION_CATEGORY_FAILURE';

export const DELETE_EXAMINATION_CATEGORY_SUCCESS = 'DELETE_EXAMINATION_CATEGORY_SUCCESS';
export const DELETE_EXAMINATION_CATEGORY_FAILURE = 'DELETE_EXAMINATION_CATEGORY_FAILURE';


export const getAllTests = () => async dispatch => {
  return axios.get('/examinations')
    .then(response => {
      console.log(response);

      dispatch({
        type: GET_EXAMINATIONS_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: GET_EXAMINATIONS_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const createTest = testAttributes => async dispatch => {
  return axios.post('/examinations', testAttributes)
    .then(response => {
      console.log(response);

      dispatch({
        type: CREATE_EXAMINATION_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_EXAMINATION_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const deleteTest = categoryId => async dispatch => {
  return axios.delete(`/examinations/${categoryId}`)
    .then(response => {
      console.log(response);

      dispatch({
        type: DELETE_EXAMINATION_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: DELETE_EXAMINATION_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


// Test categories actions
export const getAllExaminationCategories = () => async dispatch => {
  return axios.get('/examinations/categories')
    .then(response => {
      console.log(response);

      dispatch({
        type: GET_EXAMINATIONS_CATEGORIES_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: GET_EXAMINATIONS_CATEGORIES_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const createExaminationCategory = categoryAttributes => async dispatch => {
  return axios.post('/examinations/categories', categoryAttributes)
    .then(response => {
      console.log(response);

      dispatch({
        type: CREATE_EXAMINATION_CATEGORY_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_EXAMINATION_CATEGORY_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const deleteExaminationCategory = categoryId => async dispatch => {
  return axios.delete(`/examinations/categories/${categoryId}`)
    .then(response => {
      console.log(response);

      dispatch({
        type: DELETE_EXAMINATION_CATEGORY_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: DELETE_EXAMINATION_CATEGORY_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}