import { NextRequest, NextResponse } from "next/server";

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
  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  //zwracamy response
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
