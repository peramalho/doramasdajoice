import { useState } from "react";
import styled from "styled-components";
import { Roboto } from "@next/font/google";
import Modal from "./modal";

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

const Error = styled.p`
  color: #e63946;
  margin-bottom: 6px;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: #4c4c4c;
`;

const Input = styled.input`
  height: 40px;
  margin-bottom: 12px;
  color: #4c4c4c;
  font-size: 1.4rem;
`;

const Button = styled.button`
  font-size: 1.3rem;
  height: 46px;
  background: #e63946;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 6px;

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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setToken: (token: string | null) => void;
}

export default function LoginModal({ isOpen, onClose, setToken }: Props) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input === "") {
      return setError("Digite um token de autenticação");
    }

    setIsLoading(true);

    try {
      const res = await fetch("api/login", {
        method: "POST",
        body: JSON.stringify({ token: input }),
      });

      if (res.status === 401) {
        setIsLoading(false);
        return setError("Token incorreto");
      }

      const data = await res.json();
      if (res.status === 200) {
        setIsLoading(false);
        setToken(data.token);
        return handleClose();
      }
    } catch (err) {
      setIsLoading(false);
      return setError("Algo deu errado. Tente novamente");
    }
  };

  const handleClose = () => {
    setInput("");
    setError("");
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      width="400px"
      closeOnOverlay={false}
    >
      <Form onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Error>{error}</Error>
        <Label htmlFor="token">Token de autenticação</Label>
        <Input
          id="token"
          type="password"
          value={input}
          onChange={handleChange}
          autoFocus
        />
        <Button type="submit" disabled={isLoading}>
          Entrar
        </Button>
      </Form>
    </Modal>
  );
}
