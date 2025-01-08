"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <hr />
      <h2>
        {data === "" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="p-2 border border-blue-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="p-2 border border-green-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Get user details
      </button>
    </div>
  );
}

export default page;

// new line
