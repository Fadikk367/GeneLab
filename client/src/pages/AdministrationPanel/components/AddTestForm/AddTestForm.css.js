import styled from 'styled-components';


export const Form = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

export const FormHeader = styled.h3`
  font-size: 1.3em;
  padding: 10px 0;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 300px;
  padding: 3px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1em;
  
  &:hover {
    background-color: lightgray;
  }
`;

export const InputLabel = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 1.1em;

  margin-bottom: 15px;
`;

export const ErrorMessage = styled.span``;

export const Select = styled.select`
  width: 300px;
  padding: 3px;
  border-radius: 3px;
  font-size: 1em;
`;

export const SubmitButton = styled.button`
  padding: 5px;
  border-radius: 3px;
  font-size: 1.1em;
  cursor: pointer;
`;