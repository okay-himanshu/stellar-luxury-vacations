import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    }, 
  },
  { timestamps: true },
);

const CitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
  },
  { timestamps: true },
);


CitySchema.index({ countryId: 1 });

export const Country =
  mongoose.models.Country || mongoose.model("Country", CountrySchema);
export const City = mongoose.models.City || mongoose.model("City", CitySchema);
