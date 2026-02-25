import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
// Using relative paths
import dbConnect from "../../../lib/db";
import { Hotel } from "../../../models/hotel"; 
import { successResponse, errorResponse } from "../../../lib/apiResponse";

// 1. GET: Fetch all hotels with Pagination
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    let query = Hotel.find()
      .populate("countryId", "name")
      .populate("cityId", "name")
      .sort({ createdAt: -1 });

    if (limit > 0) query = query.skip(skip).limit(limit);

    const hotels = await query;
    const total = await Hotel.countDocuments();

    return successResponse({
      items: hotels,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      currentPage: page,
      totalItems: total
    });
  } catch (error) {
    return errorResponse(error.message);
  }
}

// Helper function to handle image uploads
async function handleImageUploads(images) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "hotels");
  await mkdir(uploadDir, { recursive: true });
  const imageUrls = [];

  for (const image of images) {
    if (typeof image === "object" && image.name) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uniqueName = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(uploadDir, uniqueName);
      await writeFile(filePath, buffer);
      imageUrls.push(`/uploads/hotels/${uniqueName}`);
    }
  }
  return imageUrls;
}

// 2. POST: Add new hotel
export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description"); // TEXTAREA FIELD
    const countryId = formData.get("countryId");
    const cityId = formData.get("cityId");
    const regionType = formData.get("regionType");
    
    const address = formData.get("address") || "";
    const lat = formData.get("lat") || null;
    const lng = formData.get("lng") || null;
    const mapUrl = formData.get("mapUrl") || "";

    // STRICT VALIDATION
    if (!name || !description || !countryId || !cityId || !regionType) {
      return errorResponse("All basic fields including Description are required.", 400);
    }

    const images = formData.getAll("images");
    if (images.length === 0) return errorResponse("Upload at least 1 image.", 400);
    if (images.length > 4) return errorResponse("Maximum 4 images allowed.", 400);

    const imageUrls = await handleImageUploads(images);

    const hotel = await Hotel.create({
      name, description, countryId, cityId, regionType,
      images: imageUrls,
      location: { address, lat, lng, mapUrl },
    });

    return successResponse(hotel, 201);
  } catch (error) { return errorResponse(error.message); }
}

// 3. PUT: Edit existing hotel
export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return errorResponse("Hotel ID is required", 400);

    const formData = await req.formData();
    
    // Values nikal rahe hain
    const name = formData.get("name");
    const description = formData.get("description");
    
    
    if (!name || !description) {
      return errorResponse("Name and Description cannot be empty.", 400);
    }

    const updateData = {
      name: name,
      description: description, // Ye update hona chahiye DB mein
      countryId: formData.get("countryId"),
      cityId: formData.get("cityId"),
      regionType: formData.get("regionType"),
      location: {
        address: formData.get("address") || "",
        lat: formData.get("lat") || null,
        lng: formData.get("lng") || null,
        mapUrl: formData.get("mapUrl") || "",
      }
    };

    // Images Handle
    const images = formData.getAll("images");
    if (images.length > 0 && typeof images[0] === "object") {
      if (images.length > 4) return errorResponse("Maximum 4 images allowed.", 400);
      updateData.images = await handleImageUploads(images);
    }

    // DB UPDATE
    const updatedHotel = await Hotel.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedHotel) {
      return errorResponse("Hotel not found.", 404);
    }

    console.log("Successfully Updated DB!");
    return successResponse(updatedHotel);
    
  } catch (error) { 
    console.error("PUT ERROR:", error);
    return errorResponse(error.message); 
  }
}

// 4. DELETE: Remove Hotel
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    await Hotel.findByIdAndDelete(id);
    return successResponse({ message: "Hotel deleted successfully" });
  } catch (error) { return errorResponse(error.message); }
}