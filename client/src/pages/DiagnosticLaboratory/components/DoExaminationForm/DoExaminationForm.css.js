import styled from 'styled-components';
import Button from '@material-ui/core/Button';


export const Form = styled.form`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-size: 1.1em;
`;

export const Label = styled.label`
  padding: 20px 0;
  display: flex;
  gap: 10px;
`;

export const ResultInput = styled.input`
  padding: 5px;
  width: 200px;
  margin-left: auto;
  font-size: 1.1em;
  outline: none;
  border: none;
  border-bottom: 2px solid #15857e;
  transition: background-color 0.2s ease-in-out;

  &:hover, &:focus {
    background-color: #cbf7f1;
  }
`;

export const SubmitButton = styled(Button)`
  && {
    border-radius: 0px;
    padding: 7px 10px;
    background-color: #15857e;
    color: white;
    align-self: flex-end;
    margin-top: auto;
    font-size: 1em;

    &:hover {
      background-color: #15857e;
    }
  }
`;