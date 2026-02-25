import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // BCRYPT IMPORT KIYA
import dbConnect from "../../../lib/db";
import { Member } from "../../../models/member";
import { successResponse, errorResponse } from "../../../lib/apiResponse";

// 1. GET: Fetch all members (With Pagination & Search)
export async function GET(req) {
  try {
    await dbConnect();
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
    return errorResponse(error.message);
  }
}

// 2. POST: Add new member
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    // Package ID user se nahi maang rahe, sirf zaroori details check kar rahe hain
    if (!data.password || !data.name || !data.phone) {
      return errorResponse("Password, Name, and Phone are required.", 400);
    }

    // --- AUTO GENERATE UNIQUE PACKAGE ID (CIH + 7 digits) ---
    let newPackageId;
    let isUnique = false;
    while (!isUnique) {
      const randomNum = Math.floor(1000000 + Math.random() * 9000000);
      newPackageId = `CIH${randomNum}`;
      const existingId = await Member.findOne({ packageId: newPackageId });
      if (!existingId) {
        isUnique = true; // Agar ID DB mein nahi hai, toh use karo
      }
    }
    data.packageId = newPackageId;

    // --- BCRYPT PASSWORD HASHING ---
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    // Auto calculate due amount
    const membershipAmount = Number(data.membershipAmount) || 0;
    const paidAmount = Number(data.paidAmount) || 0;
    data.dueAmount = membershipAmount - paidAmount;

    // Save to DB
    const member = await Member.create(data);
    return successResponse(member, 201);
  } catch (error) {
    return errorResponse(error.message);
  }
}

// 3. PUT: Edit existing member
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return errorResponse("Member ID is required", 400);

    const data = await req.json();

    // --- BCRYPT LOGIC FOR EDIT ---
    // Agar edit form mein naya password dala hai, toh usko hash karo
    if (data.password && data.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    } else {
      // Agar password field empty chodi hai, toh purana password overwrite na ho
      delete data.password;
    }

    // User Package ID edit nahi kar sakta
    delete data.packageId;

    // Auto calculate due amount
    const membershipAmount = Number(data.membershipAmount) || 0;
    const paidAmount = Number(data.paidAmount) || 0;
    data.dueAmount = membershipAmount - paidAmount;

    const updatedMember = await Member.findByIdAndUpdate(id, data, {
      new: true,
    });
    return successResponse(updatedMember);
  } catch (error) {
    return errorResponse(error.message);
  }
}

// 4. DELETE: Remove member
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Member.findByIdAndDelete(id);
    return successResponse({ message: "Member deleted successfully" });
  } catch (error) {
    return errorResponse(error.message);
  }
}
