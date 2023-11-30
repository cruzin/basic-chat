import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { messagesRepo } from "@/db/consts";

type Data = {
  result: string
}

async function handler(
  req: NextApiRequest, {
    params: {
      mid,
    },
  }: { params: { mid: string } },
  // res: NextApiResponse<Data>
) {
  const message = await messagesRepo.getById(mid);
  return NextResponse.json({ result: message, status: 200 });
}

export { handler as GET };