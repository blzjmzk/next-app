import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
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
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  //w innym przypadku aktualizacja uzytkownika
  const updatedProduct = await prisma.product.update({
    where: { id: product.id }, //określamy co chcemy akt
    data: {
      //nowe dane
      name: body.name,
      price: body.price,
    },
  });
  //zwracamy zaaktualizowanego uzytkownika
  return NextResponse.json(updatedProduct);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //fetchowanie uzytkownika z db
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) }, //kryteria
  });
  //jesli nie znaleziony 404
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  //usuwamy uzytkownika z bazy
  await prisma.product.delete({
    where: { id: product.id },
  });
  //res 200
  return NextResponse.json({});
}
