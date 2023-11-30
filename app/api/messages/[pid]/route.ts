import { NextRequest, NextResponse } from "next/server";
import { messagesRepo } from "@/db/consts";


async function handler(
  req: NextRequest, {
    params: {
      pid,
    },
  }: { params: { pid: string } },
) {
  const messages = await messagesRepo.getMessages(pid);
  return NextResponse.json({ result: messages, status: 200 });
}

export { handler as GET };