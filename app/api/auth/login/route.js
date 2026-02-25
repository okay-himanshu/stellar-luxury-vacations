import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/db";
import { Member } from "../../../../models/member";
import { successResponse, errorResponse } from "../../../../lib/apiResponse";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return errorResponse("Email and Password are required", 400);
    }

    // ==========================================
    // 1. ADMIN CHECK (Secure, from .env)
    // ==========================================
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Generate Real JWT for Admin
      const token = jwt.sign(
        { role: "admin", email: process.env.ADMIN_EMAIL },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      return successResponse({
        token,
        user: { email, role: "admin", name: "Super Admin" },
      });
    }

    // ==========================================
    // 2. MEMBER CHECK (From Database)
    // ==========================================
    const member = await Member.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });

    if (!member) {
      return errorResponse("Invalid Email or Password", 401);
    }

    if (!member.password) {
      return errorResponse("Password not set. Contact Admin.", 400);
    }

    // Verify Password
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return errorResponse("Invalid Email or Password", 401);
    }

    // Generate Real JWT for User
    const token = jwt.sign(
      {
        id: member._id,
        role: member.role || "member",
        email: member.email,
        packageId: member.packageId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return successResponse({
      token,
      user: {
        name: member.name,
        email: member.email,
        packageId: member.packageId,
        role: member.role || "member",
      },
    });
  } catch (error) {
    return errorResponse(error.message);
  }
}
