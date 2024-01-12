import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  //sprawdzamy czy mamy valid login i hasło
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  //jesli jest valid sprawdzamy czy nie mamy uzytkownika z tym emailem w bazie

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  //tworzymy uzytkownika
  //1:hashujemy hasło
  const hashedPassword = await bcrypt.hash(body.password, 10); //im wyzsza liczba bym wolniesza encrypcja ale bezpeczniejsza

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
    },
  });

  //zwracamy odpowiedź klientowi, bez hasła!
  return NextResponse.json({ email: newUser.email });
}
