import React from 'react';
import { useDispatch } from 'react-redux';

import { ListItem } from 'common/components';
import { deleteTestCategory } from 'state/testCategory/testCategoryActions';

const { Lp, Cell, ItemControls, Control } = ListItem;

const TestCategoryItem = ({ lp, id, name }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      <Lp>{lp}.</Lp>
      <Cell>{name}</Cell>
      <ItemControls>
        <Control onClick={() => dispatch(deleteTestCategory(id))}>&times;</Control>
      </ItemControls>
    </ListItem>
  )
}

export default TestCategoryItem;
