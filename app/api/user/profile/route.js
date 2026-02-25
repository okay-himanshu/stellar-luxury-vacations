import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/db";
import { Member } from "../../../../models/member";
import { successResponse, errorResponse } from "../../../../lib/apiResponse";

export async function GET(req) {
  try {
    await dbConnect();
    
    // Get token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse("Unauthorized access", 401);
    }

    const token = authHeader.split(" ")[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");

    // Fetch member details (Excluding password)
    const member = await Member.findById(decoded.id).select("-password");
    if (!member) {
      return errorResponse("Member not found", 404);
    }

    return successResponse(member);
  } catch (error) {
    return errorResponse("Invalid or Expired Token", 401);
  }
}