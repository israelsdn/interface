'use client';

import Modal from 'react-modal';

export default function AccountModal({
  children,
  close,
  open,
  className,
  style,
}: {
  children?: any;
  close: any;
  open: any;
  className: string;
  style?: any;
}) {
  return (
    <Modal
      isOpen={open}
      onRequestClose={close}
      className={className}
      overlayClassName="fixed inset-0 bg-transparent"
      style={style}
    >
      {children}
    </Modal>
  );
}
