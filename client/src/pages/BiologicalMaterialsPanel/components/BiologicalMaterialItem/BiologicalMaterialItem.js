import React from 'react';
import { useDispatch } from 'react-redux';

import { ListItem } from 'common/components';
import { deleteBiologicalMaterial } from 'state/biologicalMaterial/biologicalMaterialActions';

const { Lp, Cell, ItemControls, Control } = ListItem;

const BiologicalMaterialItem = ({ lp, id, name }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      <Lp>{lp}.</Lp>
      <Cell>{name}</Cell>
      <ItemControls>
        <Control onClick={() => dispatch(deleteBiologicalMaterial(id))}>&times;</Control>
      </ItemControls>
    </ListItem>
  )
}

export default BiologicalMaterialItem;
