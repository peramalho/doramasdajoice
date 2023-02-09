import styled from "styled-components";
import { DialogOverlay as ModalOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { AiOutlineClose } from "react-icons/ai";

const ModalContent = styled(DialogContent)<{ width?: string }>`
  background: #f1faee;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 8px;
  width: ${({ width }) => width || "60%"};
  padding: 30px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90%;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  border: none;
  outline: none;
  background: inherit;
  align-self: flex-end;
  cursor: pointer;
  padding: 0 0 10px 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 1.6rem;
  color: #8c8c8c;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement | Array<React.ReactElement>;
  width?: string;
  closeOnOverlay?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  width,
  closeOnOverlay = true,
}: Props) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onDismiss={closeOnOverlay ? onClose : undefined}
    >
      <ModalContent width={width}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}
