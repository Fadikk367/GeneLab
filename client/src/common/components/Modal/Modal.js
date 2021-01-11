import React from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';

import { Icon } from 'common/icons';
import { ModalWrapper, ModalContent, ModalHeader, ModalTitle } from './Modal.css';


const Modal = ({ title, children, width = 400, height = 400 }) => {
  const history = useHistory();

  const handleCloseModal = e => {
    e.stopPropagation();
    history.goBack();
  }

  return createPortal(
    <ModalWrapper onClick={handleCloseModal}>
      <ModalContent onClick={e => e.stopPropagation()} width={width} height={height}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <Icon.Close size={35} fill='white' clickable onClick={handleCloseModal}/>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalWrapper>,
    document.getElementById('modal')
  )
}

export default Modal;
