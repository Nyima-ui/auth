"use client";
import { useEffect, useState } from "react";
import { signIn, signUp } from "../actions/auth";
import Link from "next/link";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"sign-up" | "log-in">("sign-up");
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const result =
        mode === "sign-up"
          ? await signUp(credentials)
          : await signIn(credentials);

      if (result.error) {
        setError(result.error);
        return;
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    //  console.log(credentials)
  }, [credentials]);
  return (
    <div className="p-5 flex flex-col items-center justify-center min-h-screen">
      <Link href="/" className="-translate-y-30 hover:underline">
        LOGO
      </Link>
      <form
        className="min-w-90 border rounded-md p-5 -translate-y-24"
        onSubmit={handleSubmit}
      >
        <div className="space-x-5">
          <button
            className={`py-5 text-2xl cursor-pointer ${mode === "sign-up" ? "text-blue-500" : ""}`}
            onClick={() => setMode("sign-up")}
          >
            Sign up
          </button>
          <button
            className={`py-5 text-2xl cursor-pointer ${mode === "log-in" ? "text-blue-500" : ""}`}
            onClick={() => setMode("log-in")}
          >
            Log in
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="focus:outline shadow-md shadow-gray-600 border rounded-md focus:ring-[3px] focus:ring-blue-300 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-2 mt-7">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="focus:outline shadow-md shadow-gray-600 border rounded-md focus:ring-[3px] focus:ring-blue-300 focus:border-transparent"
          />
        </div>
        <div>
          <p className="text-sm mt-3 text-red-400">{error && error}</p>
        </div>
        {mode === "sign-up" ? (
          <button className="px-5 py-1.5 mt-7 border rounded-md cursor-pointer hover:scale-102">
            {loading ? "Signing up..." : "Sign up"}
          </button>
        ) : (
          <button className="px-5 py-1.5 mt-7 border rounded-md cursor-pointer hover:scale-102">
            {loading ? "Loggin in..." : "Log in"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Page;
