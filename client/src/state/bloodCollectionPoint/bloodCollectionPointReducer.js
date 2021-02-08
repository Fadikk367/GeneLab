import {
  GET_BLOOD_COLLECTION_POINTS_SUCCESS,
  CREATE_BLOOD_COLLECTION_POINT_SUCCESS,
  DELETE_BLOOD_COLLECTION_POINT_SUCCESS,
} from './bloodCollectionPointActions';


const initialState = [];

const bloodCollectionPointReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_BLOOD_COLLECTION_POINTS_SUCCESS:
      const points = action.payload;
      return [...points];
    case CREATE_BLOOD_COLLECTION_POINT_SUCCESS:
      const createdPoint = action.payload;

      return [
        ...state,
        createdPoint,
      ]
    case DELETE_BLOOD_COLLECTION_POINT_SUCCESS:
      const deletedPointId = action.payload;
      return state.filter(point => point.id !== deletedPointId);
    default:
      return state;
  }
}

export default bloodCollectionPointReducer;