'use client';

import { useState } from 'react';
import Modal from 'react-modal';

export default function AccountModal({
  children,
  className,
}: {
  children?: any;
  className?: string;
}) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={className}
    >
      {children}
    </Modal>
  );
}
