import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { messagesRepo } from "@/db/consts";

type Data = {
  result: string
}

async function handler(
  req: NextApiRequest, {
    params: {
      pid,
    },
  }: { params: { pid: string } },
  // res: NextApiResponse<Data>
) {
  const messages = await messagesRepo.getMessages(pid);
  return NextResponse.json({ result: messages, status: 200 });
}

export { handler as GET };