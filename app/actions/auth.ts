"use server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";

interface Credentials {
  email: string;
  password: string;
}

export async function signUp(credentials: Credentials) {
  const { email, password } = credentials;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, hashedPassword },
  });

  await createSession(user.id, user.email);

  return { success: true };
}
