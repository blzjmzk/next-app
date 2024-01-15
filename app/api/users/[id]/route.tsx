import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //czekamy na res body
  const body = await request.json();
  //walidacja req body -> error 400
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  //fetchowanie uzytkownika z danym id
  //jesli nie istnieje uzytkownik z tym id-> 404
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  //w innym przypadku aktualizacja uzytkownika
  const updatedUser = await prisma.user.update({
    where: { id: user.id }, //określamy co chcemy akt
    data: {
      //nowe dane
      name: body.name,
      email: body.email,
    },
  });
  //zwracamy zaaktualizowanego uzytkownika
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //fetchowanie uzytkownika z db
  const user = await prisma.user.findUnique({
    where: { id: params.id }, //kryteria
  });
  //jesli nie znaleziony 404
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  //usuwamy uzytkownika z bazy
  await prisma.user.delete({
    where: { id: user.id },
  });
  //res 200
  return NextResponse.json({});
}
