import styled from 'styled-components';
import Button from '@material-ui/core/Button';


export const ProgressBar = styled.progress`
  width: 400px;
  height: 20px;
  background-color: green;
`;


export const Layout = styled.div`
  padding: 30px;
  width: 80%;
  margin: 0 auto;
`;

export const Headline = styled.h2`
  font-size: 2em;
  font-weight: 400;
  padding: 20px 0;
`;

export const AccessCodeInput = styled.input`
  font-size: 1.1em;
  width: 400px;
  text-align: center;
  padding: 10px;
  height: 45px;
`;

export const SubmitButton = styled(Button)`
  && {  
    border-radius: 0px;
    padding: 10px 15px;
    height: 45px;
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