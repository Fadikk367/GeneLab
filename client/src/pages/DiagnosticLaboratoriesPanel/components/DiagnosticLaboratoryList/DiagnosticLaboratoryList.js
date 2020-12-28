import React from 'react';

import { List } from 'common/components';
import { DiagnosticLaboratoryItem } from '../';


const DiagnosticLaboratoryList = ({ laboratories = [] }) => {
  const renderedItems = laboratories.map((laboratory, idx) => (
    <DiagnosticLaboratoryItem key={laboratory.id} lp={idx} {...laboratory}/>
  ));

  return (
    <List.Container>
      <List.Title>Pracownie diagnostyczne ({laboratories.length})</List.Title>
      <List>
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default DiagnosticLaboratoryList;