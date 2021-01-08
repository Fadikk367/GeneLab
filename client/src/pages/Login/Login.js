import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { PageWrapper, PageContent, FormTitle, Form, TextInput, ErrorMessageBox, LoginButton, InfoParagraph } from './Login.css';

import { login } from 'state/auth/authActions';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmitLoginForm = e => {
    e.preventDefault();

    if (email && password) {
      dispatch(login({ email, password }))
        .then(() => console.log('Udał osię zalogować :)'))
        .catch(() => console.log('Nie udało się zalogowac :('));
      // console.log({ email, password });
    }
  }

  return (
    <PageWrapper>
      <PageContent>
        <Form onSubmit={handleSubmitLoginForm}>
          <FormTitle>Zaloguj się do systemu:</FormTitle>
          <FormControl>
            <InputLabel htmlFor='email-input'>Email</InputLabel>
            <TextInput id='email-input' value={email} onChange={e => setEmail(e.target.value)}/>
            <ErrorMessageBox></ErrorMessageBox>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='password-input'>Hasło</InputLabel>
            <TextInput id='passwordinput'  value={password} onChange={e => setPassword(e.target.value)}/>
            <ErrorMessageBox></ErrorMessageBox>
          </FormControl>
          <LoginButton type='submit'>Zaloguj się</LoginButton>
        </Form>
        <InfoParagraph>Nie pamiętasz hasła lub nie posaidasz konta a jesteś pracownikiem laboratorium? Skontaktuj się z administratorem systemu.</InfoParagraph>
      </PageContent>
    </PageWrapper>
  )
}

export default Login
