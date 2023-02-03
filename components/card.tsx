/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #f1faee;
  align-items: center;
  width: 340px;
  padding: 26px 26px 18px 26px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 8px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
`;

const Image = styled.img`
  width: 300px;
  min-height: 450px;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-top: 14px;
  text-align: center;
  font-weight: 400;
  font-size: 1.4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  color: #4c4c4c;
`;

interface Props {
  title: string;
  imgSrc: string;
}

export default function Card({ title, imgSrc }: Props) {
  return (
    <Wrapper>
      <Image src={imgSrc} alt={`${title} image`} />
      <Title title={title}>{title}</Title>
    </Wrapper>
  );
}
