import dbConnect from "../../../lib/db";
import { Country, City } from "../../../models/location";
import { successResponse, errorResponse } from "../../../lib/apiResponse";


export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    
    // Pagination Logic
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5; 
    const skip = (page - 1) * limit;

    // Default: fetch paginated. If limit=0, fetch all (for dropdowns)
    let query = Country.find().sort({ createdAt: -1 });
    if (limit > 0) query = query.skip(skip).limit(limit);
    
    const countries = await query;
    const total = await Country.countDocuments();

    return successResponse({
      items: countries,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      currentPage: page,
      totalItems: total
    });
  } catch (error) { return errorResponse(error.message); }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { name, code } = await req.json();
    if (!name || !code) return errorResponse("Name and Code are required", 400);

    const country = await Country.create({ name, code });
    return successResponse(country, 201);
  } catch (error) { 
    if(error.code === 11000) return errorResponse("Country code must be unique", 400);
    return errorResponse(error.message); 
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const linkedCities = await City.countDocuments({ countryId: id });
    if (linkedCities > 0) return errorResponse("Cannot delete! Remove all linked cities first.", 400);

    await Country.findByIdAndDelete(id);
    return successResponse({ message: "Deleted successfully" });
  } catch (error) { return errorResponse(error.message); }
}