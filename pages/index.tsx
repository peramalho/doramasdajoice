import styled from "styled-components";
import localFont from "@next/font/local";
import Card from "../components/card";

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

type Series = Array<{
  name: string;
  poster_path: string;
}>;

interface ResponseData {
  results: Series;
}

interface Props {
  series: Series;
}

export default function Home({ series }: Props) {
  return (
    <div>
      <Header>
        <Title className={kgHappyFont.className}>
          Doramas da <Person className={loftyGoalsFont.className}>Joice</Person>
        </Title>
      </Header>
      <PageWrapper>
        <Grid>
          {series.map((item) => (
            <Item key={item.name}>
              <Card
                title={item.name}
                imgSrc={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
              />
            </Item>
          ))}
        </Grid>
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
    props: { series: data.results },
  };
}
