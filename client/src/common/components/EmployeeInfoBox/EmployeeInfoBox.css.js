import styled from 'styled-components';
import Button from '@material-ui/core/Button';


export const BoxContainer = styled.div`
  margin-top: auto;
  padding: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
`;

export const UserProfileImage = styled.img`
  display: block;
  width: 180px;
  height: 180px;
`;

export const TextLine = styled.p`
  font-weight: 300;
  color: white;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const ActionButton = styled(Button)`
  && {  
    border-radius: 0px;
    padding: 10px 15px;
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