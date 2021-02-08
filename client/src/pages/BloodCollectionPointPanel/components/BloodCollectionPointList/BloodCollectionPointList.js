import React from 'react';
// import { useDispatch } from 'react-redux';

// import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import { List } from 'common/components';
// import { BloodCollectionPointItem } from '../';
import { StyledAccordion, StyledButton } from './BloodCollectionPointList.css';

// import { deleteBiologicalMaterial } from 'state/biologicalMaterial/biologicalMaterialActions';


const BiologicalMaterialList = ({ points = [] }) => {
  // const renderedItems = materials.map((material, idx) => (
  //   <BiologicalMaterialItem key={material.id} lp={idx} {...material}/>
  // ));

  // const dispatch = useDispatch();

  const renderedItems = points.map((point, idx) => (
    <StyledAccordion key={point.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        // aria-controls="panel1c-content"
        // id="panel1c-header"
      >
        <div style={{flex: '3'}}>
          {point.city}, {point.address}
        </div>
        <div style={{flex: '1'}}>
          {point.laboratoryId}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <h3>Opis:</h3>
        {/* <p>{material.description}</p> */}
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
          // onClick={() => dispatch(deleteBiologicalMaterial(point.id))}
        >
          Delete
        </StyledButton>
      </AccordionActions>
    </StyledAccordion>
  ));


  return (
    <List.Container>
      <List.Title>Lista wszytskich punktów pobrań ({points.length})</List.Title>
      <List>
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default BiologicalMaterialList;