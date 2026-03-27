import Link from "next/link";
import { getSession } from "@/lib/session";
import { logOut } from "./actions/auth";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="px-5">
      <header>
        <nav className="flex justify-between items-center py-5">
          <Link href="/">LOGO</Link>
          <div>
            {session ? (
              <div className="space-x-6">
                <span>{session.email}</span>
                <button
                  className="cursor-pointer hover:opacity-80"
                  onClick={logOut}
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link href="/sign-up">Sign up</Link>
            )}
          </div>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <main className="mx-auto mt-10">
        <h1 className="text-5xl">Home page</h1>
        <p className="max-w-100 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque est,
          magnam sit excepturi eveniet maiores cumque beatae laudantium illum
          animi.
        </p>
        <button className="px-5 py-2.5 mt-7 rounded-sm bg-purple-500 cursor-pointer">
          Click me
        </button>
      </main>
    </div>
  );
}
