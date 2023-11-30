import { NextRequest, NextResponse } from "next/server";

type Data = {
  hb: string
}

function handler(
  req: NextRequest,
  res: NextResponse<Data>
) {
  return NextResponse.json({ hb: 'ALIVE', status: 200 })
}

export { handler as GET, handler as POST };