/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import styled from "styled-components";
import { Roboto } from "@next/font/google";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "./modal";
import { Show } from "../pages";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const Form = styled.form.attrs({ className: roboto.className })`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: #4c4c4c;
  font-weight: 400;
`;

const InputGroup = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  color: #4c4c4c;
  font-size: 1.4rem;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  font-size: 1.3rem;
  height: 40px;
  background: #e63946;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  padding: 0 20px;

  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background: #c3c3c3;
    cursor: auto;
    &:hover {
      opacity: 1;
    }
  }
`;

const Card = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  padding: 1px;
  border: 1px solid #f1faee;
  border-radius: 8px;
  transition: border 0.2s;
  min-height: 140px;
  padding: 4px;

  &:hover {
    border: 1px solid #e63946;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const Image = styled.img`
  border-radius: 8px;
  width: 100px;
  margin-right: 20px;
`;

const Group = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ShowTitle = styled.h4`
  font-weight: 400;
`;

const AddIcon = styled(AiOutlinePlusCircle)`
  font-size: 3rem;
  color: #e63946;
  margin-right: 20px;
  opacity: 0;
  transition: opacity 0.2s;

  @media (max-width: 768px) {
    display: none;
  }
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleAddShow: (show: Show) => void;
};

interface ResponseData {
  results: Array<Show>;
}

export default function AddModal({ isOpen, onClose, handleAddShow }: Props) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showsFound, setShowsFound] = useState<Array<Show>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input === "") {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${input}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY_V3}&language=pt-BR&page=1`,
        { method: "GET" }
      );
      const data: ResponseData = await res.json();

      setShowsFound(data.results.slice(0, 10));
      setIsLoading(false);
    } catch (err) {
      console.log("Algo está errado. Tente novamente");
    }
  };

  const handleClose = () => {
    setInput("");
    setIsLoading(false);
    setShowsFound([]);
    onClose();
  };

  const onAddShow = (show: Show) => {
    handleAddShow(show);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      width="800px"
      closeOnOverlay={false}
    >
      <Form onSubmit={handleSubmit}>
        <Title>Adicionar Novo Dorama</Title>
        <InputGroup>
          <Input value={input} onChange={handleChange} autoFocus />
          <Button type="submit" disabled={isLoading}>
            Procurar
          </Button>
        </InputGroup>
        {showsFound.length > 0 &&
          showsFound.map((show) => (
            <Card key={show.id} onClick={() => onAddShow(show)}>
              {show.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w300/${show.poster_path}`}
                  alt={`${show.name} image`}
                />
              )}
              <Group>
                <ShowTitle>{show.name}</ShowTitle>
                <AddIcon />
              </Group>
            </Card>
          ))}
      </Form>
    </Modal>
  );
}
