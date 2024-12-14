"use client";

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function VerifyEmailPage() {
  //   const router = useRouter();
  const [token, setToken] = useState("");
  const [verfied, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    // const { query } = router;
    // const urlToken2 = query.token;
    // console.log("ROUTER TOKEN: ", urlToken2);

    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-400 text-black">
        {token ? `${token}` : "No token"}
      </h2>
      <button
        onClick={verifyUserEmail}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Click here to verify
      </button>

      {verfied && (
        <div>
          <h1>verified</h1>
        </div>
      )}
      {error && (
        <div>
          <h1>Error</h1>
        </div>
      )}
    </div>
  );
}

export default VerifyEmailPage;
