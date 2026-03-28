"use server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  redirect("/");
}

export async function logOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/sign-up");
}

export async function signIn(credentials: Credentials) {
  const { email, password } = credentials;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { error: "No user found with this email." };
  }

  if (user.hashedPassword) {
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }
  }

  await createSession(user.id, user.email);

  redirect("/");
}
