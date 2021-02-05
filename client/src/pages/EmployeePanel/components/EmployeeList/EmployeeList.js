import React from 'react';
import { useDispatch } from 'react-redux';

import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import { List } from 'common/components';
import { StyledAccordion, StyledButton } from './EmployeeList.css';

import { deleteEmployee } from 'state/employee/employeeActions';


const EmployeeList = ({ employees }) => {
  const dispatch = useDispatch();

  const listLabel = (
    <StyledAccordion disabled>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <div style={{width: '30px'}}>
          Lp.
        </div>
        <div style={{flex: '2'}}>
          Nazwisko Imię
        </div>
        <div style={{flex: '2'}}>
          Stanowisko
        </div>
        <div style={{flex: '2'}}>
          Email
        </div>
        <div style={{flex: '1'}}>
          Pensja
        </div>
      </AccordionSummary>
    </StyledAccordion>
  )

  const renderedItems = employees.map((employee, idx) => (
    <StyledAccordion key={employee.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <div style={{width: '30px'}}>
          {idx}
        </div>
        <div style={{flex: '2'}}>
          {employee.lastName} {employee.firstName}
        </div>
        <div style={{flex: '2'}}>
          {employee.position}
        </div>
        <div style={{flex: '2'}}>
          {employee.email}
        </div>
        <div style={{flex: '1'}}>
          {employee.salary}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{flex: '1'}}>
          data zatrudnienia:<br />
          {employee.employmentDate}
        </div>
        <div style={{flex: '1'}}>
          premia:<br />
          {employee.bonus || 0}
        </div>
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
          onClick={() => dispatch(deleteEmployee(employee.id))}
        >
          Delete
        </StyledButton>
      </AccordionActions>
    </StyledAccordion>
  ));


  return (
    <List.Container width={'1000'}>
      <List.Title>Pracownicy ({employees.length})</List.Title>
      <List>
        {listLabel}
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default EmployeeList;