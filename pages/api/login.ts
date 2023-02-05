import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const body = JSON.parse(req.body);
  if (body.token?.toLowerCase() === process.env.AUTH_TOKEN) {
    return res.status(200).json({ token: body.token });
  }

  return res.status(401).json({ message: "Wrong token" });
}
