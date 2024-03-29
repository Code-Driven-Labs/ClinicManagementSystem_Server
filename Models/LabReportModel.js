const mongoose = require("mongoose");

const labReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    reception: { type: mongoose.Schema.Types.ObjectId, ref: "Reception" },
    typename: {
      type: String,
      required: true,
    },
    url: [{ type: String, required: true }],
    createdDate: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: true,
  }
);
labReportSchema.index({ user: 1, createdDate: 1 });

const LabReport = mongoose.model("LabReport", labReportSchema);

module.exports = LabReport;
