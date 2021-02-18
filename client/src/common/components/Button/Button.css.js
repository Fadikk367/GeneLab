import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export default styled(Button)`
  && {  
    border-radius: 0px;
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    background-color: #2fad98;
    transition: transform 0.1s ease-in-out;

    &:hover {
      transform: scale(1.03);
      background-color: #2fad98;
    }

    &:active {
      transform: scale(1.01);
      background-color: #2fad98;
    }
  }
`;