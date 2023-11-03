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
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useState();
  const router = useRouter();

  // create a new user
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
      toast.error(data.message);
    }
  };

  // login a user with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
      const data = await res.json();
      if (data.message === "Login successful") {
        router.push("/");
        toast.success("Login successful");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };
  // get user details from the  store it in a cookie

  const AuthUser = async () => {
    try {
      const res = await fetch("/api/user/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.msg === "User found") {
        setAuth(data.user);
      } else {
        setAuth(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Context.Provider
      value={{
        userDetails,
        setUserDetails,
        handleSubmit,
        user,
        setUser,
        handleLogin,
        AuthUser,
        auth,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
