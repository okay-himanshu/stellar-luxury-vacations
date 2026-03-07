import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/db";
import { Member } from "../../../models/member";
import { successResponse, errorResponse } from "../../../lib/apiResponse";
import { ENV } from "../../../lib/config";
import jwt from "jsonwebtoken";

const verifyAdmin = (req) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, ENV.JWT_SECRET);

  if (decoded.email !== ENV.ADMIN_EMAIL) {
    throw new Error("Forbidden: Admin access required");
  }

  return decoded;
};

export async function GET(req) {
  try {
    await dbConnect();

    verifyAdmin(req);

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const search = searchParams.get("search") || "";

    let filter = {};
    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { packageId: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      };
    }

    let query = Member.find(filter).sort({ createdAt: -1 });
    if (limit > 0) query = query.skip(skip).limit(limit);

    const members = await query;
    const total = await Member.countDocuments(filter);

    return successResponse({
      items: members,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      currentPage: page,
      totalItems: total,
    });
  } catch (error) {
    const statusCode =
      error.message.includes("Unauthorized") ||
      error.message.includes("Forbidden")
        ? 401
        : 500;
    return errorResponse(error.message, statusCode);
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    verifyAdmin(req);

    const data = await req.json();

    if (!data.password || !data.name || !data.phone) {
      return errorResponse("Password, Name, and Phone are required.", 400);
    }

    let newPackageId;
    let isUnique = false;
    while (!isUnique) {
      const randomNum = Math.floor(1000000 + Math.random() * 9000000);
      newPackageId = `CIH${randomNum}`;
      const existingId = await Member.findOne({ packageId: newPackageId });
      if (!existingId) {
        isUnique = true;
      }
    }
    data.packageId = newPackageId;

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const membershipAmount = Number(data.membershipAmount) || 0;
    const paidAmount = Number(data.paidAmount) || 0;
    data.dueAmount = membershipAmount - paidAmount;

    const member = await Member.create(data);
    return successResponse(member, 201);
  } catch (error) {
    const statusCode =
      error.message.includes("Unauthorized") ||
      error.message.includes("Forbidden")
        ? 401
        : 500;
    return errorResponse(error.message, statusCode);
  }
}

export async function PUT(req) {
  try {
    await dbConnect();

    verifyAdmin(req);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return errorResponse("Member ID is required", 400);

    const data = await req.json();

    if (data.password && data.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    } else {
      delete data.password;
    }

    delete data.packageId;

    const membershipAmount = Number(data.membershipAmount) || 0;
    const paidAmount = Number(data.paidAmount) || 0;
    data.dueAmount = membershipAmount - paidAmount;

    const updatedMember = await Member.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedMember) {
      return errorResponse("Member not found", 404);
    }

    return successResponse(updatedMember);
  } catch (error) {
    const statusCode =
      error.message.includes("Unauthorized") ||
      error.message.includes("Forbidden")
        ? 401
        : 500;
    return errorResponse(error.message, statusCode);
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();

    verifyAdmin(req);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return errorResponse("Member ID is required", 400);

    const deletedMember = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      return errorResponse("Member not found", 404);
    }

    return successResponse({ message: "Member deleted successfully" });
  } catch (error) {
    const statusCode =
      error.message.includes("Unauthorized") ||
      error.message.includes("Forbidden")
        ? 401
        : 500;
    return errorResponse(error.message, statusCode);
  }
}
