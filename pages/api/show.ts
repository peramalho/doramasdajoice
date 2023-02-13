import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Show } from "..";

const prisma = new PrismaClient();

async function updateShows(shows: Array<Show>) {
  await prisma.show.deleteMany({});

  const createdShows = shows.map(async (show) => {
    await prisma.show.create({
      data: {
        name: show.name,
        overview: show.overview,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date,
      },
    });
  });

  return createdShows;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = JSON.parse(req.body);
  updateShows(data.shows)
    .then(async () => {
      await prisma.$disconnect();
      return res.status(200).json({ message: "success" });
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
