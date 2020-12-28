import React from 'react';
import { useDispatch } from 'react-redux';

import { ListItem } from 'common/components';
import { deleteTest } from 'state/test/testActions';

const { Lp, Cell, ItemControls, Control } = ListItem;


const TestItem = ({ lp, id, name, minvalue, maxvalue, price, unit, biomaterial, laboratory }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      <Lp>{lp}.</Lp>
      <Cell flex={3}>{name}</Cell>
      <Cell flex={3}>{minvalue}-{maxvalue} {unit}</Cell>
      <Cell flex={1}>{biomaterial}</Cell>
      <Cell flex={2}>{laboratory}</Cell>
      <Cell width={140}>{price} PLN</Cell>
      <ItemControls>
        <Control onClick={() => dispatch(deleteTest(id))}>&times;</Control>
      </ItemControls>
    </ListItem>
  )
}

export default TestItem;