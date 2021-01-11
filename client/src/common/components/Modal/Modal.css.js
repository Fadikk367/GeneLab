import styled from 'styled-components';


export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 101;
`;

export const ModalContent = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;

  width: ${props => props.width}px;
  height: ${props => props.height}px;

  background-color: white;
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #15857e;
  padding: 5px 10px;
  color: white;
`;

export const ModalTitle = styled.h3`
  font-size: 1.4em;
  font-weight: 300;
`;