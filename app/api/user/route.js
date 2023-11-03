import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function GET(req) {
  const token = cookies().get("token");
  const data = jwt.verify(token.value, process.env.JWT_SECRET);

  const id = data.id;

  const user = await User.findById(id).select("-password");
  if (!user) {
    return NextResponse.json({ msg: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ msg: "User found", user }, { status: 200 });
}
