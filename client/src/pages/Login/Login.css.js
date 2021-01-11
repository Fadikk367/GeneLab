import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';


export const PageWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #12a9a0;
  z-index: 102;
`;

export const PageContent = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: white;
  width: 700px;
  height: 500px;

  -webkit-box-shadow: 0px 0px 36px 4px rgba(13,66,62,1);
  -moz-box-shadow: 0px 0px 36px 4px rgba(13,66,62,1);
  box-shadow: 0px 0px 36px 4px rgba(13,66,62,1);

  padding: 60px;
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.h2`
  font-size: 2em;
  font-weight: 800;
  letter-spacing: 1px;
  color: #15857e;
  margin-bottom: 15px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TextInput = styled(Input)`
  && {  
    input {
      font-size: 1.3em;
      padding: 7px 0;
    }

    label {
      font-size: 1.2em;
      margin-bottom: 10px;
    }

    &::after {
      border-bottom: 3px solid #15857e;
    }

    label.Mui-focused {
      color: #15857e;
    }
  }
`;


export const ErrorMessageBox = styled(FormHelperText)`
  && {
    font-size: 0.8em;
    padding: 3px 0;
    height: 20px;
  }
`;

export const LoginButton = styled(Button)`
  && {  
    border-radius: 0;
    padding: 7px;
    font-size: 1.2em;
    width: 200px;
    color: white;
    background-color: #15857e;
    transition: transform 0.1s ease-in-out;
    align-self: flex-end;

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

export const InfoParagraph = styled.p`
  color: rgba(0, 0, 0, 0.54);
  font-weight: 300;
  font-size: 0.8em;
  margin-top: auto;
`;