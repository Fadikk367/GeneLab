import axios from 'axios';

// export const GET_BIOLOGICAL_MATERIALS = 'GET_BIOLOGICAL_MATERIALS';
// export const GET_BIOLOGICAL_MATERIALS_REQUEST = 'GET_BIOLOGICAL_MATERIALS_REQUEST';
export const GET_BIOLOGICAL_MATERIALS_SUCCESS = 'GET_BIOLOGICAL_MATERIALS_SUCCESS';
export const GET_BIOLOGICAL_MATERIALS_FAILURE = 'GET_BIOLOGICAL_MATERIALS_FAILURE';

// export const CREATE_BIOLOGICAL_MATERIAL = 'CREATE_BIOLOGICAL_MATERIAL';
// export const CREATE_BIOLOGICAL_MATERIAL_REQUEST = 'CREATE_BIOLOGICAL_MATERIAL_REQUEST';
export const CREATE_BIOLOGICAL_MATERIAL_SUCCESS = 'CREATE_BIOLOGICAL_MATERIAL_SUCCESS';
export const CREATE_BIOLOGICAL_MATERIAL_FAILURE = 'CREATE_BIOLOGICAL_MATERIAL_FAILURE';

// export const UPDATE_BIOLOGICAL_MATERIAL = 'UPDATE_BIOLOGICAL_MATERIAL';
// export const UPDATE_BIOLOGICAL_MATERIAL_REQUEST = 'UPDATE_BIOLOGICAL_MATERIAL_REQUEST';
export const UPDATE_BIOLOGICAL_MATERIAL_SUCCESS = 'UPDATE_BIOLOGICAL_MATERIAL_SUCCESS';
export const UPDATE_BIOLOGICAL_MATERIAL_FAILURE = 'UPDATE_BIOLOGICAL_MATERIAL_FAILURE';

// export const DELETE_BIOLOGICAL_MATERIAL = 'DELETE_BIOLOGICAL_MATERIAL';
// export const DELETE_BIOLOGICAL_MATERIAL_REQUEST = 'DELETE_BIOLOGICAL_MATERIAL_REQUEST';
export const DELETE_BIOLOGICAL_MATERIAL_SUCCESS = 'DELETE_BIOLOGICAL_MATERIAL_SUCCESS';
export const DELETE_BIOLOGICAL_MATERIAL_FAILURE = 'DELETE_BIOLOGICAL_MATERIAL_FAILURE';


export const getAllBiologicalMaterials = () => async dispatch => {
  return axios.get('/materials')
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


export const createBiologicalMaterial = (materialName, materialDescription) => async dispatch => {
  return axios.post('/materials', { materialName, materialDescription })
    .then(response => {
      console.log(response);

      dispatch({
        type: CREATE_BIOLOGICAL_MATERIAL_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_BIOLOGICAL_MATERIAL_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const deleteBiologicalMaterial = materialId => async dispatch => {
  return axios.delete(`/materials/${materialId}`)
    .then(response => {
      console.log(response);

      dispatch({
        type: DELETE_BIOLOGICAL_MATERIAL_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: DELETE_BIOLOGICAL_MATERIAL_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}