import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import dbConnect from "../../../lib/db";
import { Hotel } from "../../../models/hotel";
import { successResponse, errorResponse } from "../../../lib/apiResponse";
import { extractCoordinatesFromMapUrl } from "../../../utils/extractCoordinates";

/* =====================================================
   IMAGE UPLOAD
===================================================== */
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

/* =====================================================
   GET HOTELS
===================================================== */
export async function GET(req) {
  try {
    await dbConnect();

    const hotels = await Hotel.find()
      .populate("countryId", "name")
      .populate("cityId", "name")
      .sort({ createdAt: -1 });

    return successResponse(hotels);
  } catch (error) {
    return errorResponse(error.message);
  }
}

/* =====================================================
   CREATE HOTEL
===================================================== */
export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const countryId = formData.get("countryId");
    const cityId = formData.get("cityId");
    const regionType = formData.get("regionType");

    let address = formData.get("address") || "";
    let lat = formData.get("lat") || null;
    let lng = formData.get("lng") || null;
    const mapUrl = formData.get("mapUrl") || "";

    if (!name || !description || !countryId || !cityId || !regionType) {
      return errorResponse("Required fields missing", 400);
    }

    /* ===== AUTO FETCH LAT LNG ===== */
    if ((!lat || !lng) && mapUrl) {
      const coords = await extractCoordinatesFromMapUrl(mapUrl);

      if (coords) {
        lat = coords.lat;
        lng = coords.lng;
      }
    }

    const images = formData.getAll("images");

    if (images.length === 0)
      return errorResponse("Upload at least 1 image.", 400);

    const imageUrls = await handleImageUploads(images);

    const hotel = await Hotel.create({
      name,
      description,
      countryId,
      cityId,
      regionType,
      images: imageUrls,
      location: { address, lat, lng, mapUrl },
    });

    return successResponse(hotel, 201);
  } catch (error) {
    return errorResponse(error.message);
  }
}

/* =====================================================
   UPDATE HOTEL
===================================================== */
export async function PUT(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const formData = await req.formData();

    let address = formData.get("address") || "";
    let lat = formData.get("lat") || null;
    let lng = formData.get("lng") || null;
    const mapUrl = formData.get("mapUrl") || "";

    /* ===== AUTO EXTRACT ON UPDATE ===== */
    if ((!lat || !lng) && mapUrl) {
      const coords = await extractCoordinatesFromMapUrl(mapUrl);

      if (coords) {
        lat = coords.lat;
        lng = coords.lng;
      }
    }

    const updateData = {
      name: formData.get("name"),
      description: formData.get("description"),
      countryId: formData.get("countryId"),
      cityId: formData.get("cityId"),
      regionType: formData.get("regionType"),
      location: { address, lat, lng, mapUrl },
    };

    const images = formData.getAll("images");

    if (images.length > 0 && typeof images[0] === "object") {
      updateData.images = await handleImageUploads(images);
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return successResponse(updatedHotel);
  } catch (error) {
    return errorResponse(error.message);
  }
}

/* =====================================================
   DELETE HOTEL
===================================================== */
export async function DELETE(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Hotel.findByIdAndDelete(id);

    return successResponse({ message: "Hotel deleted successfully" });
  } catch (error) {
    return errorResponse(error.message);
  }
}
