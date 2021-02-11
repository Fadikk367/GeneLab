import React from 'react';
import { useDispatch } from 'react-redux';

import { List, ListItem } from 'common/components';

import { deleteEmployeePosition } from 'state/employeePosition/employeePositionActions';

const { Lp, Cell, ItemControls, Control } = ListItem;



const EmployeePositionList = ({ positions = [] }) => {
  const dispatch = useDispatch();

  const renderedItems = positions.map((position, idx) => (
    <ListItem key={position.id}>
      <Lp width='40'>{idx}.</Lp>
      <Cell width='240'>{position.name}</Cell>
      <Cell flex={1}>{position.description}</Cell>
      <ItemControls>
        <Control onClick={() => dispatch(deleteEmployeePosition(position.id))}>&times;</Control>
      </ItemControls>
    </ListItem>
  ));


  return (
    <List.Container width='100%'>
      <List.Title>Stanowsika pracowników: ({positions.length})</List.Title>
      <List>
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default EmployeePositionList;