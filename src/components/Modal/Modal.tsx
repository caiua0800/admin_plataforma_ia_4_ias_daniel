import { XMarkIcon } from '@heroicons/react/24/solid';
import * as S from './Modal.styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <S.Backdrop onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.CloseButton onClick={onClose}>
            <XMarkIcon />
          </S.CloseButton>
        </S.ModalHeader>
        <S.ModalBody>
          {children}
        </S.ModalBody>
      </S.ModalContent>
    </S.Backdrop>
  );
}