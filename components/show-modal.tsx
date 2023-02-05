/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { Roboto } from "@next/font/google";
import { Show } from "../pages/index";
import Modal from "./modal";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const Wrapper = styled.div`
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

export default function ShowModal({ isOpen, onClose, show }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
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
      </Wrapper>
    </Modal>
  );
}
