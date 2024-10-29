import { embedResource, splitEmbedStore } from "@/actions/embed";
import { Resource } from "@/types";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { webUrl } = await req.json();
  const content = ""

  const resourceReq: Resource = {
    id: webUrl,
    content // TODO fetch content of the page
  }
  const resource = await embedResource(resourceReq);

  // embed the resource
  const success = await splitEmbedStore(content);
  return NextResponse.json(success);
}