import styled from 'styled-components';
import Button from '@material-ui/core/Button';


export const ListWrapper = styled.div`
  flex-grow: 1;
`;

export const ActionButton = styled(Button)`
  && {  
    margin: 10px;
    border-radius: 0px;
    padding: 10px 15px;
    color: white;
    background-color: #15857e;
    transition: transform 0.1s ease-in-out;

    &:hover {
      transform: scale(1.03);
      background-color: #15857e;
    }

    &:active {
      transform: scale(1.01);
      background-color: #15857e;
    }
  }
`;