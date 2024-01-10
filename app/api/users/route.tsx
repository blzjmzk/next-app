import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "John" },
    { id: 2, name: "Mark" },
  ]);
}

export async function POST(request: NextRequest) {
  //czytamy req body
  const body = await request.json();
  //walidacja
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  //zwracamy response
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
