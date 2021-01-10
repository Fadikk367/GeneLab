import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddBiologicalMaterialForm, BiologicalMaterialList } from './components';

import { getAllBiologicalMaterials } from 'state/biologicalMaterial/biologicalMaterialActions';


const BiologicalMaterial = () => {
  const materials = useSelector(state => state.biologicalMaterial.materialList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBiologicalMaterials());
  }, [dispatch])
  
  return (
    <>
      <AddBiologicalMaterialForm />
      <BiologicalMaterialList materials={materials}/>
    </>
  )
}

export default BiologicalMaterial;
