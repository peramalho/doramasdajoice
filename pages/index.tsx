/* eslint-disable @next/next/no-img-element */
export default function Home({ series }) {
  return (
    <div>
      <ul>
        {series.map((item) => (
          <li key={item.name}>
            {item.name}
            <img
              src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
              alt={`${item.name} image`}
            />
          </li>
        ))}
      </ul>
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
  const data = await res.json();

  return {
    props: { series: data.results },
  };
}
