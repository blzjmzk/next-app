import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  //czytamy req body
  const body = await request.json();
  //walidacja
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  //zwracamy response
  return NextResponse.json(
    { id: 10, name: body.name, price: body.price },
    { status: 201 }
  );
}
