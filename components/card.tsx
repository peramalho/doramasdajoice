/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";

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
  position: relative;
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

const NewShowWrapper = styled(Wrapper)`
  justify-content: center;
  min-height: 540px;
  justify-self: center;
`;

const AddIcon = styled(AiOutlinePlusCircle)`
  font-size: 8rem;
  color: #d3d3d3;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: #e63946;
  border: 1px solid #e63946;
  border-radius: 0 0 0 8px;
  cursor: pointer;
  margin: 0;
  padding: 0;
  padding: 2px;

  &:hover {
    opacity: 0.8;
  }
`;

const DeleteIcon = styled(AiOutlineDelete)`
  font-size: 2.6rem;
  color: #fff;
`;

interface Props {
  id?: number;
  title?: string;
  imgSrc?: string;
  handleClick: () => void;
  newShow?: boolean;
  handleDeleteShow?: (id: number) => void;
  isAuthenticated?: boolean;
}

export default function Card({
  id,
  title,
  imgSrc,
  handleClick,
  newShow = false,
  handleDeleteShow,
  isAuthenticated,
}: Props) {
  if (newShow) {
    return (
      <NewShowWrapper onClick={handleClick}>
        <AddIcon />
      </NewShowWrapper>
    );
  }

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleDeleteShow!(id!);
  };

  return (
    <Wrapper onClick={handleClick}>
      <Image src={imgSrc} alt={`${title} image`} />
      <Title title={title}>{title}</Title>
      {isAuthenticated && (
        <DeleteButton onClick={onDelete}>
          <DeleteIcon />
        </DeleteButton>
      )}
    </Wrapper>
  );
}
