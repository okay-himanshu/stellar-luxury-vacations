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
      totalItems: total
    });
  } catch (error) { return errorResponse(error.message); }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { name, countryId } = await req.json();
    if (!name || !countryId) return errorResponse("Name and Country are required", 400);

    const city = await City.create({ name, countryId });
    return successResponse(city, 201);
  } catch (error) { return errorResponse(error.message); }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await City.findByIdAndDelete(id);
    return successResponse({ message: "Deleted successfully" });
  } catch (error) { return errorResponse(error.message); }
}