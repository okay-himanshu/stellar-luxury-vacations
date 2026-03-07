import dbConnect from "../../../lib/db";
import { City } from "../../../models/location";
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

    const cities = await City.find()
      .populate("countryId", "name code")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await City.countDocuments();

    return successResponse({
      items: cities,
      totalPages: Math.ceil(total / limit),
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

    const { name, countryId, regionType } = await req.json();

    if (
      !name ||
      !countryId ||
      !Array.isArray(regionType) ||
      regionType.length === 0
    ) {
      return errorResponse(
        "Name, Country, and at least one Region Type are required",
        400,
      );
    }

    const city = await City.create({ name, countryId, regionType });
    return successResponse(city, 201);
  } catch (error) {
    const statusCode = error.message.includes("Unauthorized") || error.message.includes("Forbidden") ? 401 : 500;
    return errorResponse(error.message, statusCode);
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    
    verifyAdmin(req);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return errorResponse("City ID is required", 400);

    const { name, countryId, regionType } = await req.json();

    if (
      !name ||
      !countryId ||
      !Array.isArray(regionType) ||
      regionType.length === 0
    ) {
      return errorResponse(
        "Name, Country, and at least one Region Type are required",
        400,
      );
    }

    const updatedCity = await City.findByIdAndUpdate(
      id,
      { name, countryId, regionType },
      { new: true },
    );

    if (!updatedCity) {
      return errorResponse("City not found", 404);
    }

    return successResponse(updatedCity);
  } catch (error) {
    const statusCode = error.message.includes("Unauthorized") || error.message.includes("Forbidden") ? 401 : 500;
    return errorResponse(error.message, statusCode);
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    
    verifyAdmin(req);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return errorResponse("City ID is required", 400);

    const deletedCity = await City.findByIdAndDelete(id);
    
    if (!deletedCity) {
        return errorResponse("City not found", 404);
    }
    
    return successResponse({ message: "Deleted successfully" });
  } catch (error) {
    const statusCode = error.message.includes("Unauthorized") || error.message.includes("Forbidden") ? 401 : 500;
    return errorResponse(error.message, statusCode);
  }
}