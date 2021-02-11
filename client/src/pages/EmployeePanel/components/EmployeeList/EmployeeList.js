import React from 'react';
import { Link } from 'react-router-dom';

import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import { List } from 'common/components';
import { StyledAccordion } from './EmployeeList.css';


const EmployeeList = ({ employees }) => {
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
        <div style={{width: '30px'}}>
        </div>
        <div style={{flex: '2'}}>
          data zatrudnienia:<br />
          {employee.employmentDate.substring(0, 10)}
        </div>
        <div style={{flex: '2'}}>
          premia:<br />
          {employee.bonus || 0}
        </div>
        <div style={{flex: '3'}}>
          <Link to={`/admin-panel/employees/${employee.id}/update`}>Zaktualizuj</Link>
        </div>
      </AccordionDetails>
    </StyledAccordion>
  ));


  return (
    <List.Container width={'100%'}>
      <List.Title>Pracownicy ({employees.length})</List.Title>
      <List>
        {listLabel}
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default EmployeeList;