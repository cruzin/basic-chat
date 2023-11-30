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
  const task = await messagesRepo.getById(mid);
  return NextResponse.json({ result: task, status: 200 });
}

export { handler as GET };