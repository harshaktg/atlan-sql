// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import USERS from "data/index";
import { nanoid } from "nanoid";

type Data = {
  name: string;
};

function shuffleArray(array) {
  const updatedArray = [...array];
  for (let i = updatedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [updatedArray[i], updatedArray[j]] = [updatedArray[j], updatedArray[i]];
  }
  return updatedArray;
}

const ALL_REQUESTS = [];

/**
 * Handler for getting and posting queries
 * @param req
 * @param res
 * @returns
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      return res.status(200).json({
        data: ALL_REQUESTS.sort((a, b) => b.cat - a.cat),
        size: ALL_REQUESTS.length,
      });
    case "POST":
      const newEntry = {
        id: nanoid(),
        name: `Query ${ALL_REQUESTS.length + 1}`,
        query: req.body.query,
        data: shuffleArray(USERS).slice(0, Math.random() * 20),
        cat: new Date().getTime(),
      };
      ALL_REQUESTS.push(newEntry);
      return res.status(200).json(newEntry);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
