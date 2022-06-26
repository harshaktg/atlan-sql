// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import USERS from "data/index";

type Data = {
  name: string;
};

/**
 * API to fetch all entries in Product table
 * @param req
 * @param res
 * @returns
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return res.status(200).json({
    data: USERS,
    size: USERS.length,
  });
}
