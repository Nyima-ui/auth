"use client";
import { useEffect, useState } from "react";

const Page = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    //  console.log(credentials)
  }, [credentials])
  return (
    <div className="p-5 flex items-center justify-center min-h-screen">
      <form
        className="min-w-90 border rounded-md p-5 -translate-y-24"
        onSubmit={handleSubmit}
      >
        <div>
          <button className="text-blue-500 py-5 text-2xl">Sign up</button>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
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
            className="focus:outline shadow-md shadow-gray-600 border rounded-md focus:ring-[3px] focus:ring-blue-300 focus:border-transparent"
          />
        </div>
        <button className="px-5 py-1.5 mt-7 border rounded-md cursor-pointer hover:scale-102">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Page;
