import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

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
  // zwracamy response
  const product = await prisma.product.findFirst({
    where: { name: body.name },
  });

  if (product)
    return NextResponse.json(
      { error: "Product already exists" },
      { status: 400 }
    );

  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json(newProduct, { status: 201 });
}
