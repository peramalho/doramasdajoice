import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  background: #1d3557;
`;

const Content = styled.div`
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  font-size: 1.1rem;
  height: 36px;
  background: #457b9d;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  margin-left: 20px;
  padding: 0 10px;

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

  @media (max-width: 768px) {
    margin-left: 0px;
    margin-top: 10px;
  }
`;

type Props = {
  handleSaveShows: () => void;
};

export default function UnsavedBanner({ handleSaveShows }: Props) {
  return (
    <Wrapper>
      <Content>
        Existem alteração não salvas. Deseja Salvar?{" "}
        <Button onClick={handleSaveShows}>Salvar</Button>
      </Content>
    </Wrapper>
  );
}
