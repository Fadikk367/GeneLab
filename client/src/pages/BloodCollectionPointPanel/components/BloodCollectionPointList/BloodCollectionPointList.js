import React from 'react';

import { List, ListItem } from 'common/components';
import { BloodCollectionPointItem } from '../';

const { Lp, Cell } = ListItem;




const BiologicalMaterialList = ({ points = [] }) => {
  const renderedItems = points.map((point, idx) => (
    <BloodCollectionPointItem key={point.id} lp={idx} {...point} />
  ));


  return (
    <List.Container>
      <List.Title>Lista wszytskich punktów pobrań ({points.length})</List.Title>
      <List>
        <ListItem header>
          <Lp>Lp.</Lp>
          <Cell flex={1}>Adres</Cell>
          <Cell>Id laboratorium</Cell>
          <Cell></Cell>
        </ListItem>
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default BiologicalMaterialList;