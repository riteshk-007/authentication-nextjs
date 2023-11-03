"use client";

import { Context } from "@/context/Context";
import Link from "next/link";
import { useContext, useEffect } from "react";

const Hero = () => {
  const { AuthUser, auth } = useContext(Context);
  useEffect(() => {
    AuthUser();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {auth ? (
        <div className="flex items-center justify-center flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {auth?.name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 my-3">
            {auth?.email}
          </p>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className=" w-96 bg-gray-500 text-white rounded-lg shadow-lg">
            <div className="my-4 items-center text-center">
              <h2 className="font-semibold text-xl uppercase">
                User not login
              </h2>
              <p className="my-2 text-sm">
                Please login to see your profile and other information
              </p>
              <div className="flex items-center w-full justify-center gap-3">
                <Link
                  href={"/login"}
                  className=" bg-purple-600 uppercase text-sm text-white px-2 py-2 rounded shadow-md cursor-pointer hover:bg-purple-700  transition-all duration-150 ease-in"
                >
                  Login
                </Link>
                <Link
                  href={"/signup"}
                  className="bg-gray-500 uppercase text-sm text-white px-3 py-2 rounded  cursor-pointer hover:bg-gray-600 hover:shadow-md transition-all duration-150 ease-in"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
