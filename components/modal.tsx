/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { DialogOverlay as ModalOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { AiOutlineClose } from "react-icons/ai";
import { Roboto } from "@next/font/google";
import { Show } from "../pages/index";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const ModalContent = styled(DialogContent)`
  background: #f1faee;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 8px;
  width: 60%;
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
  background: transparent;
  align-self: flex-end;
  cursor: pointer;
  padding: 10px 0;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 1.6rem;
  color: #8c8c8c;
`;

const Main = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 300px;
  border-radius: 8px;
  max-height: 450px;

  @media (max-width: 768px) {
    align-self: center;
  }
`;

const TextContent = styled.div.attrs({ className: roboto.className })`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  color: #4c4c4c;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Title = styled.h3`
  font-size: 3rem;
  margin-bottom: 8px;
`;

const Year = styled.p`
  font-size: 1.4rem;
  margin-bottom: 8px;
`;

const Description = styled.p`
  text-align: justify;
  font-size: 1.4rem;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  show?: Show;
}

function Modal({ isOpen, onClose, show }: Props) {
  return (
    <ModalOverlay isOpen={isOpen} onDismiss={onClose}>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <Main>
          <Image
            src={`https://image.tmdb.org/t/p/w300/${show?.poster_path}`}
            alt={`${show?.name} image`}
          />
          <TextContent>
            <Title>{show?.name}</Title>
            <Year>
              {show ? new Date(show.first_air_date).getFullYear() : undefined}
            </Year>
            <Description>{show?.overview}</Description>
          </TextContent>
        </Main>
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;
