import React from 'react';

import { List } from 'common/components';
import { BiologicalMaterialItem } from '../';


const BiologicalMaterialList = ({ materials = [] }) => {
  const renderedItems = materials.map((material, idx) => (
    <BiologicalMaterialItem key={material.id} lp={idx} {...material}/>
  ));

  return (
    <List.Container>
      <List.Title>Biological materials ({materials.length})</List.Title>
      <List>
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default BiologicalMaterialList;