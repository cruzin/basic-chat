import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server";

type Data = {
  hb: string
}

function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return NextResponse.json({ hb: 'ALIVE', status: 200 })
}

export { handler as GET, handler as POST };