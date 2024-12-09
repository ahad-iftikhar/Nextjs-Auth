import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );

    const tokenData = {
      id: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { success: true, message: "Logged In successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
