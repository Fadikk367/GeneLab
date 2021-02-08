import axios from 'axios';

// export const GET_BLOOD_COLLECTION_POINTS = 'GET_BLOOD_COLLECTION_POINTS';
// export const GET_BLOOD_COLLECTION_POINTS_REQUEST = 'GET_BLOOD_COLLECTION_POINTS_REQUEST';
export const GET_BLOOD_COLLECTION_POINTS_SUCCESS = 'GET_BLOOD_COLLECTION_POINTS_SUCCESS';
export const GET_BLOOD_COLLECTION_POINTS_FAILURE = 'GET_BLOOD_COLLECTION_POINTS_FAILURE';

// export const CREATE_BLOOD_COLLECTION_POINT = 'CREATE_BLOOD_COLLECTION_POINT';
// export const CREATE_BLOOD_COLLECTION_POINT_REQUEST = 'CREATE_BLOOD_COLLECTION_POINT_REQUEST';
export const CREATE_BLOOD_COLLECTION_POINT_SUCCESS = 'CREATE_BLOOD_COLLECTION_POINT_SUCCESS';
export const CREATE_BLOOD_COLLECTION_POINT_FAILURE = 'CREATE_BLOOD_COLLECTION_POINT_FAILURE';

// export const UPDATE_BLOOD_COLLECTION_POINT = 'UPDATE_BLOOD_COLLECTION_POINT';
// export const UPDATE_BLOOD_COLLECTION_POINT_REQUEST = 'UPDATE_BLOOD_COLLECTION_POINT_REQUEST';
export const UPDATE_BLOOD_COLLECTION_POINT_SUCCESS = 'UPDATE_BLOOD_COLLECTION_POINT_SUCCESS';
export const UPDATE_BLOOD_COLLECTION_POINT_FAILURE = 'UPDATE_BLOOD_COLLECTION_POINT_FAILURE';

// export const DELETE_BLOOD_COLLECTION_POINT = 'DELETE_BLOOD_COLLECTION_POINT';
// export const DELETE_BLOOD_COLLECTION_POINT_REQUEST = 'DELETE_BLOOD_COLLECTION_POINT_REQUEST';
export const DELETE_BLOOD_COLLECTION_POINT_SUCCESS = 'DELETE_BLOOD_COLLECTION_POINT_SUCCESS';
export const DELETE_BLOOD_COLLECTION_POINT_FAILURE = 'DELETE_BLOOD_COLLECTION_POINT_FAILURE';


export const getAllBloodCollectionPoints = () => async dispatch => {
  return axios.get('/laboratories/collection-points')
    .then(response => {
      console.log(response);

      dispatch({
        type: GET_BLOOD_COLLECTION_POINTS_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: GET_BLOOD_COLLECTION_POINTS_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const createBloodCollectionPoint = pointAttributes => async dispatch => {
  return axios.post('/laboratories/collection-points', pointAttributes)
    .then(response => {
      console.log(response);

      dispatch({
        type: CREATE_BLOOD_COLLECTION_POINT_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_BLOOD_COLLECTION_POINT_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const deleteBloodCollectionPoint = pointId => async dispatch => {
  return axios.delete(`/laboratories/collection-points/${pointId}`)
    .then(response => {
      console.log(response);

      dispatch({
        type: DELETE_BLOOD_COLLECTION_POINT_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: DELETE_BLOOD_COLLECTION_POINT_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}