
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import { City } from "../../../../models/location";
import { successResponse, errorResponse } from "../../../../lib/apiResponse";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const region = searchParams.get("region");
    if (!region) {
      return errorResponse("Region is required", 400);
    }

    const limit = parseInt(searchParams.get("limit")) || 1000;

    const cities = await City.find({
      regionType: { $in: [region] },
    })
      .sort({ name: 1 })
      .limit(limit);

    return successResponse({ items: cities });
  } catch (error) {
    return errorResponse(error.message);
  }
}
