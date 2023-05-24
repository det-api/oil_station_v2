import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface fuelInDocument extends mongoose.Document {
  stationId: string;
  tankNo: string;
  tankMaxCap: number;
  fuelType: string;
  tankLevel: number;
  tankLevelLG: string;
  availableToFill: number;
  tankTemp: number;
  tankLevelStatus: string;
  stockTime: Date;
}

const fuelInSchema = new Schema({
  stationId: {
    type: Schema.Types.ObjectId,
    ref: "stationDetail",
    default: "6464e9f1c45b82216ab1db6b",
  },
  tankNo: { type: String, required: true },
  tankMaxCap: { type: String, required: true },
  fuelType: { type: String, required: true },
  tankLevel: { type: Number, required: true },
  tankLevelLG: { type: String, required: true },
  availableToFill: { type: String, required: true },
  tankTemp: { type: Number, required: true },
  tankLevelStatus: { type: String, default: "sale" },
  stockTime: { type: Date, default: new Date() },
});

const fuelInModel = mongoose.model<fuelInDocument>("fuelIn", fuelInSchema);

export default fuelInModel;
