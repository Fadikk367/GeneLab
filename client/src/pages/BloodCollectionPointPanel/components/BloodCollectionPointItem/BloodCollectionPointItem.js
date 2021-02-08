import React from 'react';
import { useDispatch } from 'react-redux';

import { ListItem } from 'common/components';
import { deleteBloodCollectionPoint } from 'state/bloodCollectionPoint/bloodCollectionPointActions';

const { Lp, Cell, ItemControls, Control } = ListItem;

const BloodCollectionPointItem = ({ lp, id, city, address, laboratoryId }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      <Lp>{lp}.</Lp>
      <Cell>{city}, {address}</Cell>
      <Cell>{laboratoryId}</Cell>
      <ItemControls>
        <Control onClick={() => dispatch(deleteBloodCollectionPoint(id))}>&times;</Control>
      </ItemControls>
    </ListItem>
  )
}

export default BloodCollectionPointItem;
