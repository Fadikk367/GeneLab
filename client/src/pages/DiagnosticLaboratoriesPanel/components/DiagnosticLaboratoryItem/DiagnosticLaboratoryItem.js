import React from 'react';
import { useDispatch } from 'react-redux';

import { ListItem } from 'common/components';
import { deleteDiagnosticLaboratory } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';

const { Lp, Cell, ItemControls, Control } = ListItem;

const DiagnosticLaboratoryItem = ({ lp, id, name }) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      <Lp>{lp}.</Lp>
      <Cell>{name}</Cell>
      <ItemControls>
        <Control onClick={() => dispatch(deleteDiagnosticLaboratory(id))}>&times;</Control>
      </ItemControls>
    </ListItem>
  )
}

export default DiagnosticLaboratoryItem;