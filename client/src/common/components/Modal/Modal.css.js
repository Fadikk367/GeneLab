import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
`;


export const ModalContent = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: ${props => props.width}px;
  height: ${props => props.height}px;

  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;