import axios from 'axios';

// export const GET_BIOLOGICAL_MATERIALS = 'GET_BIOLOGICAL_MATERIALS';
// export const GET_BIOLOGICAL_MATERIALS_REQUEST = 'GET_BIOLOGICAL_MATERIALS_REQUEST';
export const GET_BIOLOGICAL_MATERIALS_SUCCESS = 'GET_BIOLOGICAL_MATERIALS_SUCCESS';
export const GET_BIOLOGICAL_MATERIALS_FAILURE = 'GET_BIOLOGICAL_MATERIALS_FAILURE';

// export const GET_EXAMINATION_TYPES = 'GET_EXAMINATION_TYPES';
// export const GET_EXAMINATION_TYPES_REQUEST = 'GET_EXAMINATION_TYPES_REQUEST';
export const GET_EXAMINATION_TYPES_SUCCESS = 'GET_EXAMINATION_TYPES_SUCCESS';
export const GET_EXAMINATION_TYPES_FAILURE = 'GET_EXAMINATION_TYPES_FAILURE';



export const getBiologicalMaterials = () => async dispatch => {
  return axios.get('/common/materials')
    .then(response => {
      console.log(response);

      dispatch({
        type: GET_BIOLOGICAL_MATERIALS_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: GET_BIOLOGICAL_MATERIALS_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}

export const getAllExaminationTypes = () => async dispatch => {
  return axios.get('/common/types')
    .then(response => {
      console.log(response);

      dispatch({
        type: GET_EXAMINATION_TYPES_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: GET_EXAMINATION_TYPES_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}
