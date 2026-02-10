import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../../../lib/users";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: "Wrong password" }, { status: 400 });
  }

  const token = jwt.sign(
    { userId: user.userId, username: user.username, isAdmin: user.isAdmin },
    "SECRET_KEY",
    { expiresIn: "1h" },
  );

  return NextResponse.json({
    message: "Login successful",
    token,
  });
}
