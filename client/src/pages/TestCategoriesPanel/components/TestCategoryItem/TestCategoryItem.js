import React from 'react';
import { useDispatch } from 'react-redux';

import { ListItem } from 'common/components';
import { deleteExaminationCategory } from 'state/examination/examinationActions';

const { Lp, Cell, ItemControls, Control } = ListItem;

const TestCategoryItem = ({ lp, id, name, description }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      <Lp>{lp}.</Lp>
      <Cell>{name}</Cell>
      <Cell>{description}</Cell>
      <ItemControls>
        <Control onClick={() => dispatch(deleteExaminationCategory(id))}>&times;</Control>
      </ItemControls>
    </ListItem>
  )
}

export default TestCategoryItem;
