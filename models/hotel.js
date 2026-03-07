import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }, // TEXTAREA FIELD
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },

    regionType: {
      type: String,
      enum: ["India", "International", "Internal Exchange"],
      required: true,
    },

    images: [{ type: String }],

    location: {
      address: { type: String },
      lat: { type: Number },
      lng: { type: Number },
      mapUrl: { type: String },
    },
  },
  { timestamps: true },
);

export const Hotel =
  mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
