import Link from "next/link";

export default async function Home() {
  return (
    <div className="px-5">
      <header>
        <nav className="flex justify-between items-center py-5">
          <Link href="/">LOGO</Link>
          <Link href="/sign-up">Sign up</Link>
        </nav>
      </header>
      <main className="mx-auto mt-10">
        <h1 className="text-5xl">Home page</h1>
        <p className="max-w-100 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque est, magnam sit excepturi eveniet maiores cumque beatae laudantium illum animi.</p>
        <button className="px-5 py-2.5 mt-7 rounded-sm bg-purple-500 cursor-pointer">Click me</button>
      </main>
    </div>
  );
}
