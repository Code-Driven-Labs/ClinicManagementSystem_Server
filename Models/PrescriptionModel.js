const mongoose = require("mongoose");
const vitalsSchema = new mongoose.Schema({
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  bloodPressure: {
    type: Number,
  },
  bloodSugar: {
    type: Number,
  },
  priorDisease: {
    type: String,
  },
  priorMedication: {
    type: String,
  },
});
const segmentSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Segment",
  },
  segments: [String],
});
const prescriptionDataSchema = new mongoose.Schema({
  paths: [
    {
      segments: [segmentSchema],
      color: {
        type: String,
        required: true,
      },
    },
  ],
  circles: [Number],
  stamps: [Number],
});
const prescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: false,
    },
    timeSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeSlot",
      required: false,
    },
    reception: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reception",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prescriptionData: {
      type: prescriptionDataSchema,
    },
    vitals: {
      type: vitalsSchema,
    },
    isLocked: { type: Boolean, default: false },
    url: { type: String },
    previousPrescriptions: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
//Short hand
//Required = date , userId,
//Not required =reception , appointmentId, timeSlotId , reception , user , prescriptionData , , vitals,
