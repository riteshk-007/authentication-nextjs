import connectDB from "@/libs/MongoDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password } = await req.json();
  await connectDB();
  try {
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    } else {
      const isNewPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: isNewPassword });
      if (user) {
        return NextResponse.json(
          { message: "User created successfully", user },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "user already exists" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "user already exists", error },
      { status: 500 }
    );
  }
}
