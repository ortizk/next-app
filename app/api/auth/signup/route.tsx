import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { error } from "console";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: "Please enter valid credentials" },
      { status: 400 }
    );
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword: hashedPassword,
    },
  });
  return NextResponse.json("User has been added!", { status: 201 });
}
