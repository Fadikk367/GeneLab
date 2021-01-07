import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { PageWrapper, PageContent, FormTitle, Form, TextInput, ErrorMessageBox, LoginButton, InfoParagraph } from './Login.css';


const Login = () => {
  return (
    <PageWrapper>
      <PageContent>
        <Form>
          <FormTitle>Zaloguj się do systemu:</FormTitle>
          <FormControl>
            <InputLabel htmlFor='email-input'>Email</InputLabel>
            <TextInput id='email-input'/>
            <ErrorMessageBox></ErrorMessageBox>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='password-input'>Hasło</InputLabel>
            <TextInput id='passwordinput'/>
            <ErrorMessageBox></ErrorMessageBox>
          </FormControl>
          <LoginButton>Zaloguj się</LoginButton>
        </Form>
        <InfoParagraph>Nie pamiętasz hasła lub nie posaidasz konta a jesteś pracownikiem laboratorium? Skontaktuj się z administratorem systemu.</InfoParagraph>
      </PageContent>
    </PageWrapper>
  )
}

export default Login
