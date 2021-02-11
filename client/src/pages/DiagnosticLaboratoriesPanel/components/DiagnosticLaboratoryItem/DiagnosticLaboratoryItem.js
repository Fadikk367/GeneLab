import React from 'react';

import { ListItem } from 'common/components';
const { Lp, Cell } = ListItem;


const DiagnosticLaboratoryItem = ({ lp, city, street, number, numberOfDevices }) => {

  return (
    <ListItem>
      <Lp>{lp}.</Lp>
      <Cell flex={1}>{city}, {street} {number}</Cell>
      <Cell>{numberOfDevices}</Cell>
    </ListItem>
  )
}

export default DiagnosticLaboratoryItem;
