import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/db";
import { Member } from "../../../../models/member"; // Small 'm' as per your schema
import { successResponse, errorResponse } from "../../../../lib/apiResponse";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse("No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret",
    );

    // Agar Admin hai
    if (decoded.role === "admin") {
      return successResponse({
        role: "admin",
        email: decoded.email,
        name: "Super Admin",
      });
    }

    // Agar User hai toh DB se data lao
    await dbConnect();
    const member = await Member.findById(decoded.id).select("-password").lean();
    if (!member) {
      return errorResponse("User not found in DB", 404);
    }

    return successResponse({ ...member, role: member.role || "member" });
  } catch (error) {
    console.error("Auth API Error:", error.message);
    return errorResponse("Invalid or Expired Token", 401);
  }
}
