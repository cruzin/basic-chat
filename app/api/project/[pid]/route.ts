import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { chatsRepo } from "@/db/consts";

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

  console.log(pid);
  // return NextResponse.json({ result: "OK", status: 200 });
  // const { pid } = req.query;
  const project = await chatsRepo.getById(pid);

  return NextResponse.json({ result: project, status: 200 });
}

export { handler as GET };