import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import { Hotel } from "../../../../models/hotel";
import "../../../../models/location";
import { successResponse, errorResponse } from "../../../../lib/apiResponse";

export async function GET(req, { params }) {
  try {
    await dbConnect();


    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return errorResponse("Invalid Hotel ID", 400);
    }

    const hotel = await Hotel.findById(id)
      .populate("countryId", "name")
      .populate("cityId", "name");

    if (!hotel) {
      return errorResponse("Hotel not found", 404);
    }

    return successResponse(hotel);
  } catch (error) {
    return errorResponse(error.message);
  }
}
