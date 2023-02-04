import { useState, useMemo } from "react";
import styled from "styled-components";
import localFont from "@next/font/local";
import Head from "next/head";
import Card from "../components/card";
import Modal from "../components/modal";
import Image from "next/image";

const kgHappyFont = localFont({ src: "../fonts/kg-happy.ttf" });
const loftyGoalsFont = localFont({ src: "../fonts/lofty-goals.otf" });

const Header = styled.div`
  background: #e63946;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 3.2rem;
  color: #fff;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    line-break: strict;
  }
`;

const Person = styled.span`
  font-size: 7rem;
  margin-left: 20px;

  @media (max-width: 768px) {
    font-size: 3.4rem;
  }
`;

const HeartImage = styled(Image).attrs({ width: 80, height: 80 })`
  margin-left: 14px;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const PageWrapper = styled.div`
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 60px;
  padding: 60px 0;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export type Show = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
};

interface ResponseData {
  results: Array<Show>;
}

interface Props {
  shows: Array<Show>;
}

export default function Home({ shows }: Props) {
  const [selectedShowId, setSelectedShowId] = useState<number | null>(null);

  const handleSelectShow = (id: number) => setSelectedShowId(id);
  const handleDeselectShow = () => setSelectedShowId(null);

  const selectedShow = useMemo(() => {
    return shows.find((show) => show.id === selectedShowId);
  }, [shows, selectedShowId]);

  return (
    <div>
      <Head>
        <title>Doramas da Joice</title>
        <link rel="shortcut icon" href="/korean-heart.ico" />
      </Head>
      <Header>
        <Title className={kgHappyFont.className}>
          Doramas da <Person className={loftyGoalsFont.className}>Joice</Person>
          <HeartImage src="/korean-heart.svg" alt="korean-heart" />
        </Title>
      </Header>
      <PageWrapper>
        <Grid>
          {shows.map((show) => (
            <Item key={show.name}>
              <Card
                title={show.name}
                imgSrc={`https://image.tmdb.org/t/p/w300/${show.poster_path}`}
                handleClick={() => handleSelectShow(show.id)}
              />
            </Item>
          ))}
        </Grid>

        <Modal
          isOpen={Boolean(selectedShowId)}
          onClose={handleDeselectShow}
          show={selectedShow}
        />
      </PageWrapper>
    </div>
  );
}

export async function getStaticProps() {
  const listId = "8238048";

  const res = await fetch(
    `https://api.themoviedb.org/4/list/${listId}?language=pt-BR`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    }
  );
  const data: ResponseData = await res.json();

  return {
    props: { shows: data.results },
  };
}
