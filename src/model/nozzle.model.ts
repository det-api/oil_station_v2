import mongoose, { Schema } from "mongoose";

export interface nozzleInput {
  nozzleId: string;
  oilType: string;
  currentLiter: number;
  stopedLiter: number;
  price: number;
}

export interface nozzleDocument extends nozzleInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const nozzleSchema = new Schema(
  {
    nozzleId: { type: String, requierd: true },
    oilType: { type: String, required: true },
    currentLiter: { type: Number, requierd: true },
    stopedLiter: { type: Number, default: 0 },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const nozzleModel = mongoose.model<nozzleDocument>("nozzle", nozzleSchema);

export default nozzleModel;
