import styled from 'styled-components';
import Accordion from '@material-ui/core/Accordion';
import Button from '@material-ui/core/Button';

export const StyledButton = styled(Button)`
  && {
    border-radius: 0px;
    font-weight: 500;
    background-color: red;

    &:hover {
      background-color: yellow;
    }
  }
`;

export const StyledAccordion = styled(Accordion)`
  && { 

    &:hover {
      background-color: lightgrey !important;
    }

    &:nth-child(odd) {
      background-color: #e8fffd;
    }
    border-radius: 0px;
    /* padding: 10px; */
  }
`;

export const ListContainer = styled.div`
  width: ${props => props.width || '600'}px;
`;

export const ListTitle = styled.h3`
  font-size: 1.3em;
  padding: 10px;
  border-bottom: 1px solid black;
  margin: 10px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 10px;
`;