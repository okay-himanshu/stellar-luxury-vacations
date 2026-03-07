import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import dbConnect from "../../../lib/db";
import { Hotel, Country, City } from "../../../models/hotel";
import { successResponse, errorResponse } from "../../../lib/apiResponse";
import { extractCoordinatesFromMapUrl } from "../../../utils/extractCoordinates";
import { ENV } from "../../../lib/config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const regionType = searchParams.get("regionType");
    const cityIdsParam = searchParams.get("cityIds");

    const query = {};

    // region filter
    if (regionType) {
      query.regionType = regionType;
    }

    // city filter
    if (cityIdsParam) {
      const cityIdsArray = cityIdsParam
        .split(",")
        .filter((id) => id.trim() !== "")
        .map((id) => new mongoose.Types.ObjectId(id));

      if (cityIdsArray.length > 0) {
        query.cityId = { $in: cityIdsArray };
      }
    }

    const skip = (page - 1) * limit;

    const hotels = await Hotel.find(query)
      .populate("countryId", "name")
      .populate("cityId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Hotel.countDocuments(query);
    const hasMore = page * limit < total;

    return successResponse({
      items: hotels,
      total,
      page,
      hasMore,
    });
  } catch (error) {
    return errorResponse(error.message);
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    verifyAdmin(req);

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
    const statusCode =
      error.message.includes("Unauthorized") ||
      error.message.includes("Forbidden")
        ? 401
        : 500;
    return errorResponse(error.message, statusCode);
  }
}

export async function PUT(req) {
  try {
    await dbConnect();

    verifyAdmin(req);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const formData = await req.formData();

    let address = formData.get("address") || "";
    let lat = formData.get("lat") || null;
    let lng = formData.get("lng") || null;
    const mapUrl = formData.get("mapUrl") || "";

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

    if (!updatedHotel) {
      return errorResponse("Hotel not found", 404);
    }

    return successResponse(updatedHotel);
  } catch (error) {
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

    if (!id) return errorResponse("Hotel ID is required", 400);

    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (!deletedHotel) {
      return errorResponse("Hotel not found", 404);
    }

    return successResponse({ message: "Hotel deleted successfully" });
  } catch (error) {
    const statusCode =
      error.message.includes("Unauthorized") ||
      error.message.includes("Forbidden")
        ? 401
        : 500;
    return errorResponse(error.message, statusCode);
  }
}
