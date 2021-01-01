import React from 'react';
import { useDispatch } from 'react-redux';

// import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { List } from 'common/components';
import { StyledAccordion, StyledButton } from './EmployeePositionList.css';

import { deleteEmployeePosition } from 'state/employeePosition/employeePositionActions';


const EmployeePositionList = ({ positions = [] }) => {
  const dispatch = useDispatch();

  const renderedItems = positions.map((position, idx) => (
    <StyledAccordion key={position.id}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div style={{flex: '3'}}>
          {position.name}
        </div>
        <div style={{flex: '2'}}>
          {position.salary}
        </div>
        <div style={{flex: '1'}}>
          {position.id}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <h3>Opis:</h3>
        <p>{position.description}</p>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
      <StyledButton 
          size="medium" 
          color="red"
          startIcon={<EditIcon />}
        >
          Edit
        </StyledButton>
        <StyledButton 
          size="medium"
          startIcon={<DeleteIcon/>}
          onClick={() => dispatch(deleteEmployeePosition(position.id))}
        >
          Delete
        </StyledButton>
      </AccordionActions>
    </StyledAccordion>
  ));


  return (
    <List.Container>
      <List.Title>Stanowsika pracowników: ({positions.length})</List.Title>
      <List>
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default EmployeePositionList;