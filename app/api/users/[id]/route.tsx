import { NextRequest, NextResponse } from "next/server";

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10)
    return NextRequest.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ id: 1, name: "Stephen" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  //czekamy na res body
  const body = await request.json();
  //walidacja req body -> error 400
  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  //fetchowanie uzytkownika z danym id
  //jesli nie istnieje uzytkownik z tym id-> 404
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  //w innym przypadku aktualizacja uzytkownika
  //zwracamy zaaktualizowanego uzytkownika
  return NextResponse.json({ id: 1, name: body.name });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  //fetchowanie uzytkownika z db
  //jesli nie znaleziony 404
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  //usuwamy uzytkownika z bazy
  //res 200
  return NextResponse.json({});
}
