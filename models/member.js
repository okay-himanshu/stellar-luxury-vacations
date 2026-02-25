import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    // Sirf ek baar define karna hai
    packageId: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Personal Details
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    role: { type: String, default: "member" },
    dob: { type: Date },
    anniversaryDate: { type: Date },
    spouseName: { type: String, trim: true },
    spouseDob: { type: Date },
    childrenDetails: { type: String, trim: true },

    // Contact Details
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },

    // Membership Details
    membershipCategory: { type: String, required: true },
    membershipDuration: { type: String, required: true },
    membershipAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    dueAmount: { type: Number, required: true },
    joiningDate: { type: Date, required: true },
  },
  { timestamps: true },
);

// Ye check zaroori hai Next.js ke liye
export const Member =
  mongoose.models.Member || mongoose.model("Member", MemberSchema);
