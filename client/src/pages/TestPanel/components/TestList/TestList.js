import React from 'react';

import { List, ListItem } from 'common/components';
import { TestItem } from '../';

const { Lp, Cell, ItemControls, Control } = ListItem;


const TestList = ({ tests = [] }) => {
  const ListLabel = (
    <ListItem header>
      <Lp>Lp.</Lp>
      <Cell flex={3}>Nazwa</Cell>
      <Cell flex={3}>Przedział wartości</Cell>
      <Cell flex={1}>Materiał</Cell>
      <Cell flex={2}>Pracownia</Cell>
      <Cell width={140}>Cena</Cell>
      <ItemControls>
        <Control>&times;</Control>
      </ItemControls>
    </ListItem>
  )

  const renderedItems = tests.map((test, idx) => (
    <TestItem key={test.id} lp={idx} {...test}/>
  ));

  return (
    <List.Container width={1000}>
      <List.Title>Badania: ({tests.length})</List.Title>
      <List>
        {ListLabel}
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default TestList;