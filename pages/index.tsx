import { useState, useMemo } from "react";
import styled from "styled-components";
import localFont from "@next/font/local";
import Head from "next/head";
import Image from "next/image";
import { Roboto } from "@next/font/google";
import { PrismaClient } from "@prisma/client";
import Card from "../components/card";
import ShowModal from "../components/show-modal";
import LoginModal from "../components/login-modal";
import AddModal from "../components/add-modal";
import UnsavedBanner from "../components/unsaved-banner";

const listId = "8238048";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const kgHappyFont = localFont({
  src: "../fonts/kg-happy.ttf",
  display: "swap",
});
const loftyGoalsFont = localFont({
  src: "../fonts/lofty-goals.otf",
  display: "swap",
});

const Header = styled.div`
  background: #e63946;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

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

const Button = styled.button.attrs({ className: roboto.className })`
  position: absolute;
  text-align: right;
  top: 0;
  right: 0;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  background: inherit;
  color: #fff;
  padding: 10px;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
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
  const [currentShows, setCurrentShows] = useState(shows);
  const [selectedShowId, setSelectedShowId] = useState<number | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleSelectShow = (id: number) => setSelectedShowId(id);

  const handleAddShow = (show: Show) => {
    setCurrentShows((shows) => [show, ...shows]);
    setUnsavedChanges(true);
  };

  const handleDeleteShow = (id: number) => {
    setCurrentShows((shows) => shows.filter((show) => show.id !== id));
    setUnsavedChanges(true);
  };

  const handleSaveShows = async () => {
    try {
      await fetch(`api/show`, {
        method: "POST",
        body: JSON.stringify({
          shows: currentShows,
        }),
      });

      setUnsavedChanges(false);
    } catch (err) {
      console.log("Doramas não puderam ser salvos. Tente novamente");
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  const selectedShow = useMemo(() => {
    return currentShows.find((show) => show.id === selectedShowId);
  }, [currentShows, selectedShowId]);

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
        {Boolean(token) ? (
          <Button onClick={handleLogout}>Sair</Button>
        ) : (
          <Button onClick={() => setIsLoginModalOpen(true)}>Login</Button>
        )}
      </Header>
      {Boolean(token) && unsavedChanges && (
        <UnsavedBanner handleSaveShows={handleSaveShows} />
      )}
      <PageWrapper>
        <Grid>
          {Boolean(token) && (
            <Card newShow handleClick={() => setIsAddModalOpen(true)} />
          )}
          {currentShows.map((show) => (
            <Item key={show.id}>
              <Card
                id={show.id}
                title={show.name}
                imgSrc={`https://image.tmdb.org/t/p/w300/${show.poster_path}`}
                handleClick={() => handleSelectShow(show.id)}
                handleDeleteShow={handleDeleteShow}
                isAuthenticated={Boolean(token)}
              />
            </Item>
          ))}
        </Grid>

        <ShowModal
          isOpen={Boolean(selectedShowId)}
          onClose={() => setSelectedShowId(null)}
          show={selectedShow}
        />

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          setToken={setToken}
        />

        <AddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          handleAddShow={handleAddShow}
        />
      </PageWrapper>
    </div>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();

  async function getShows() {
    const shows = await prisma.show.findMany();

    return shows as Array<Show>;
  }

  let shows: Array<Show> = [];
  try {
    shows = await getShows();
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }

  return {
    props: { shows },
    revalidate: 60,
  };
}
