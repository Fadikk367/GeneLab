import React from 'react';
import { useDispatch } from 'react-redux';

import { ListItem } from 'common/components';
import { deleteTest } from 'state/examination/examinationActions';

const { Lp, Cell, ItemControls, Control } = ListItem;


const TestItem = ({ lp, id, name, minValue, maxValue, price, unit, material, type }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      <Lp>{lp}.</Lp>
      <Cell flex={3}>{name}</Cell>
      <Cell flex={2}>{minValue}-{maxValue}</Cell>
      <Cell flex={1}>{unit}</Cell>
      <Cell flex={1}>{material}</Cell>
      <Cell flex={2}>{type}</Cell>
      <Cell width={140}>{price} PLN</Cell>
      <ItemControls>
        <Control onClick={() => dispatch(deleteTest(id))}>&times;</Control>
      </ItemControls>
    </ListItem>
  )
}

export default TestItem;