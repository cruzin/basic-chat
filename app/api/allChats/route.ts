import type { NextApiResponse } from 'next'
import { NextResponse,NextRequest } from "next/server";
import { chatsRepo } from "@/db/consts";


type Data = {
  result: string
}

async function handler(
  req: NextRequest,
  res: NextApiResponse<Data>
) {
  const all = await chatsRepo.getAll();

  return NextResponse.json({ result: all, status: 200 })

}

export { handler as GET };