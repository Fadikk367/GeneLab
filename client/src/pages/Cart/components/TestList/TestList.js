import React from 'react';

import { List, ListItem } from 'common/components';
import { ListWrapper } from './TestList.css';
import { TestItem } from '../';

const { Lp, Cell, ItemControls, Control } = ListItem;


const TestList = ({ items }) => {
  const listLabel = (
    <ListItem header>
      <Lp>Lp.</Lp>
      <Cell flex={1}>Nazwa</Cell>
      <Cell width={140}>Cena</Cell>
      <ItemControls>
        <Control>&times;</Control>
        <button>Do koszyka

        </button>
      </ItemControls>
    </ListItem>
  )

  const renderedItems = items.map((test, idx) => (
    <TestItem key={test.id} lp={idx} {...test}/>
  ));

  return (
    <ListWrapper>
      
      <List>
        {listLabel}
        {renderedItems}
      </List>
    </ListWrapper>
  )
}

export default TestList
