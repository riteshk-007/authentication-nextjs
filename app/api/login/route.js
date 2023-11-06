import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/libs/MongoDB";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        cookies().set("token", token, {
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    }
  }

  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}
