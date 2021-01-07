import React from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';

import { ModalWrapper, ModalContent } from './Modal.css';


const Modal = ({ title, children, width = 400, height = 400 }) => {
  const history = useHistory();

  const handleCloseModal = e => {
    e.stopPropagation();
    history.goBack();
  }

  return createPortal(
    <ModalWrapper onClick={handleCloseModal}>
      <ModalContent onClick={e => e.stopPropagation()} width={width} height={height}>
        <button onClick={handleCloseModal}>&times;</button>
        <h2>Modal - {title}</h2>
        {children}
      </ModalContent>
    </ModalWrapper>,
    document.getElementById('modal')
  )
}

export default Modal;
