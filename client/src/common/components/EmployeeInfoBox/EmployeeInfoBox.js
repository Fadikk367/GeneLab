import React from 'react';
import { useDispatch } from 'react-redux';

import { BoxContainer, UserProfileImage, TextLine, ActionButtons, ActionButton } from './EmployeeInfoBox.css';

import { logout } from 'state/auth/authActions';

import userProfile from 'images/user-placeholder.png';


const EmployeeInfoBox = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <BoxContainer>
      <UserProfileImage src={userProfile} alt=""/>
      <TextLine>{user.firstName} {user.lastName}</TextLine>
      <TextLine>{user.position}</TextLine>
      <ActionButtons>
        <ActionButton>Profil</ActionButton>
        <ActionButton onClick={() => dispatch(logout())}>Wyloguj</ActionButton>
      </ActionButtons>
    </BoxContainer>
  )
}

export default EmployeeInfoBox
