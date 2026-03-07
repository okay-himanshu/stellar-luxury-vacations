import dbConnect from "../../../lib/db";
import { Country, City } from "../../../models/location";
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
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 1000;
    const skip = (page - 1) * limit;

    let query = Country.find().sort({ createdAt: -1 });
    if (limit > 0) query = query.skip(skip).limit(limit);

    const countries = await query;
    const total = await Country.countDocuments();

    return successResponse({
      items: countries,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      currentPage: page,
      totalItems: total,
    });
  } catch (error) {
    return errorResponse(error.message);
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    verifyAdmin(req);

    const { name, code } = await req.json();
    if (!name || !code) return errorResponse("Name and Code are required", 400);

    const country = await Country.create({ name, code });
    return successResponse(country, 201);
  } catch (error) {
    if (error.code === 11000)
      return errorResponse("Country code must be unique", 400);
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

    const linkedCities = await City.countDocuments({ countryId: id });
    if (linkedCities > 0)
      return errorResponse(
        "Cannot delete! Remove all linked cities first.",
        400,
      );

    await Country.findByIdAndDelete(id);
    return successResponse({ message: "Deleted successfully" });
  } catch (error) {
    const statusCode =
      error.message.includes("Unauthorized") ||
      error.message.includes("Forbidden")
        ? 401
        : 500;
    return errorResponse(error.message, statusCode);
  }
}
