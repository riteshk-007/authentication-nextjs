import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function POST(req) {
  const token = cookies().delete("token");
  if (token === undefined) {
    return NextResponse.json(
      { message: "User logged out successfully" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "User not logged out" },
      { status: 401 }
    );
  }
}
