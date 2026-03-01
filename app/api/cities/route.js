import dbConnect from "../../../lib/db";
import { City } from "../../../models/location";
import { successResponse, errorResponse } from "../../../lib/apiResponse";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
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
    return errorResponse(error.message);
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
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
    return errorResponse(error.message);
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await City.findByIdAndDelete(id);
    return successResponse({ message: "Deleted successfully" });
  } catch (error) {
    return errorResponse(error.message);
  }
}
