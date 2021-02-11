import React from 'react';

import { List, ListItem } from 'common/components';
import { DiagnosticLaboratoryItem } from '../';

const { Lp, Cell } = ListItem;

const DiagnosticLaboratoryList = ({ laboratories = [] }) => {
  const renderedItems = laboratories.map((laboratory, idx) => (
    <DiagnosticLaboratoryItem key={laboratory.id} lp={idx} {...laboratory}/>
  ));

  return (
    <List.Container>
      <List.Title>Laboratoria diagnostyczne ({laboratories.length})</List.Title>
      <List>
        <ListItem header>
          <Lp>Lp.</Lp>
          <Cell flex={1}>Adres</Cell>
          <Cell>Liczba urządzeń</Cell>
          <Cell></Cell>
        </ListItem>
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default DiagnosticLaboratoryList;