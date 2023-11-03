"use client";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
        }),
      });
      const data = await res.json();
      if (data.message === "User created successfully") {
        router.push("/login");
        toast.success("User created successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Context.Provider value={{ userDetails, setUserDetails, handleSubmit }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
