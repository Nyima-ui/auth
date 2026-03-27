import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET!;

export async function createSession(userId: number, email: string) {
  const token = jwt.sign({ userId, email }, SECRET, { expiresIn: "7d" });

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, SECRET);
    return payload as { userId: number; email: string };
  } catch {
    return null;
  }
}
