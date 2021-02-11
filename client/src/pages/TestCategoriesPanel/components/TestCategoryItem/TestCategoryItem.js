import React from 'react';
import { useDispatch } from 'react-redux';

import { ListItem } from 'common/components';
import { deleteExaminationCategory } from 'state/examination/examinationActions';

const { Lp, Cell, ItemControls, Control } = ListItem;

const TestCategoryItem = ({ lp, id, name, description }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      <Lp width='40'>{lp}.</Lp>
      <Cell width='240'>{name}</Cell>
      <Cell flex={1}>{description}</Cell>
      <ItemControls>
        <Control onClick={() => dispatch(deleteExaminationCategory(id))}>&times;</Control>
      </ItemControls>
    </ListItem>
  )
}

export default TestCategoryItem;
