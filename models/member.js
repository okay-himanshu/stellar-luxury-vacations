import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    // Credentials
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

    // Core Membership Details
    membershipCategory: { type: String, required: true },
    membershipDuration: { type: String, required: true },
    membershipAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    dueAmount: { type: Number, required: true },
    joiningDate: { type: Date, required: true },

    // 👉 NAYA: Holiday Details
    totalNights: { type: Number, default: 0 },
    usedNights: { type: Number, default: 0 },
    holidays: [
      {
        nights: { type: Number },
        checkIn: { type: Date },
        checkOut: { type: Date },
        detail: { type: String },
        bookedDate: { type: Date },
      },
    ],

    // 👉 NAYA: Membership Payment History
    membershipPayments: [
      {
        receiptNo: { type: String },
        receiptDate: { type: Date },
        mode: { type: String },
        bank: { type: String },
        chequeOrCardNo: { type: String },
        paymentType: { type: String },
        amount: { type: Number },
      },
    ],

    // 👉 NAYA: AMC Payment History
    amcPayments: [
      {
        receiptNo: { type: String },
        receiptDate: { type: Date },
        mode: { type: String },
        bank: { type: String },
        chequeOrCardNo: { type: String },
        paymentType: { type: String },
        amount: { type: Number },
      },
    ],

    // 👉 NAYA: Offers List
    offers: [
      {
        offerName: { type: String },
        validity: { type: Date },
        availability: { type: String, default: "Active" },
      },
    ],
  },
  { timestamps: true },
);

// Ye check zaroori hai Next.js ke liye taaki model overwrite na ho
export const Member =
  mongoose.models.Member || mongoose.model("Member", MemberSchema);
