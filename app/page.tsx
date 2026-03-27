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
    </div>
  );
}
