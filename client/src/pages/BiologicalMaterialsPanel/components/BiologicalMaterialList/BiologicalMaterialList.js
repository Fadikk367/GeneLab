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
import { BiologicalMaterialItem } from '../';
import { StyledAccordion, StyledButton } from './BiologicalMaterialList.css';

import { deleteBiologicalMaterial } from 'state/biologicalMaterial/biologicalMaterialActions';


const BiologicalMaterialList = ({ materials = [] }) => {
  // const renderedItems = materials.map((material, idx) => (
  //   <BiologicalMaterialItem key={material.id} lp={idx} {...material}/>
  // ));

  const dispatch = useDispatch();

  const renderedItems = materials.map((material, idx) => (
    <StyledAccordion key={material.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        // aria-controls="panel1c-content"
        // id="panel1c-header"
      >
        <div style={{flex: '1'}}>
          {material.name}
        </div>
        <div style={{flex: '1'}}>
        {material.id}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <h3>Opis:</h3>
        <p>{material.description}</p>
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
          onClick={() => dispatch(deleteBiologicalMaterial(material.id))}
        >
          Delete
        </StyledButton>
      </AccordionActions>
    </StyledAccordion>
  ));


  return (
    <List.Container>
      <List.Title>Biological materials ({materials.length})</List.Title>
      <List>
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default BiologicalMaterialList;