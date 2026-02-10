import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../../../lib/users";

export async function POST(req) {
  const { username, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    userId: uuidv4(),
    username,
    email,
    password: hashedPassword,
    isAdmin: false,
  };

  users.push(newUser);

  const token = jwt.sign(
    { userId: newUser.userId, username, isAdmin: false },
    "SECRET_KEY",
    { expiresIn: "1h" },
  );

  return NextResponse.json({
    message: "User registered successfully",
    userId: newUser.userId,
    token,
  });
}
