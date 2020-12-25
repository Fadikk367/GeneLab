import {
  GET_BIOLOGICAL_MATERIALS_SUCCESS,
  GET_BIOLOGICAL_MATERIALS_FAILURE,

  CREATE_BIOLOGICAL_MATERIAL_SUCCESS,
  CREATE_BIOLOGICAL_MATERIAL_FAILURE,

  DELETE_BIOLOGICAL_MATERIAL_SUCCESS,
  DELETE_BIOLOGICAL_MATERIAL_FAILURE,
} from './biologicalMaterialActions';


const initialState = {
  materialList: []
}

const biologicalMaterialReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_BIOLOGICAL_MATERIALS_SUCCESS:
      return {
        ...state,
        materialList: action.payload.biologicalMaterials
      }
    case GET_BIOLOGICAL_MATERIALS_FAILURE:
      return {
        ...state,
        materialList: []
      }
    case CREATE_BIOLOGICAL_MATERIAL_SUCCESS:
      const createdBiologicalMaterial = action.payload.createdBiologicalMaterial
      return {
        ...state,
        materialList: [...state.materialList, createdBiologicalMaterial]
      }
    case CREATE_BIOLOGICAL_MATERIAL_FAILURE:
      return {
        ...state,
      }
    case DELETE_BIOLOGICAL_MATERIAL_SUCCESS:
      const deletedBiologicalMaterial = action.payload.deletedBiologicalMaterial
      return {
        ...state,
        materialList: state.materialList.filter(material => material.id !== deletedBiologicalMaterial.id)
      }
    case DELETE_BIOLOGICAL_MATERIAL_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default biologicalMaterialReducer;