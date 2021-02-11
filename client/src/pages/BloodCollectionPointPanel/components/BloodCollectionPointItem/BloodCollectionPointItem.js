import React from 'react';

import { ListItem } from 'common/components';

const { Lp, Cell } = ListItem;


const BloodCollectionPointItem = ({ lp, id, city, street, number, laboratoryId }) => {
  return (
    <ListItem>
      <Lp>{lp}.</Lp>
      <Cell flex={1}>{city}, {street} {number}</Cell>
      <Cell>{laboratoryId}</Cell>
      <Cell></Cell>
    </ListItem>
  )
}

export default BloodCollectionPointItem;
