import React from 'react';
import { useSelector } from 'react-redux';

import { AddBiologicalMaterialForm, BiologicalMaterialList } from './components';

const BiologicalMaterial = () => {
  const materials = useSelector(state => state.biologicalMaterial.materialList);

  return (
    <>
      <AddBiologicalMaterialForm />
      <BiologicalMaterialList materials={materials}/>
    </>
  )
}

export default BiologicalMaterial
