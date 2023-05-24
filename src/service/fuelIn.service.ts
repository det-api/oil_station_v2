import { FilterQuery, UpdateQuery } from "mongoose";
import fuelInModel, { fuelInDocument } from "../model/fuelIn.model";

export const getFuelIn = async (query: FilterQuery<fuelInDocument>) => {
  try {
    return await fuelInModel.find(query).lean().populate('stationId').select("-__v");
  } catch (e) {
    throw new Error(e);
  }
};

export const addFuelIn = async (body: fuelInDocument) => {
  try {
    return await new fuelInModel(body).save();
  } catch (e) {
    throw new Error(e);
  }
};

export const updateFuelIn = async (
  query: FilterQuery<fuelInDocument>,
  body: UpdateQuery<fuelInDocument>
) => {
  try {
    await fuelInModel.updateMany(query, body);
    return await fuelInModel.find(query).lean();
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteFuelIn = async (query: FilterQuery<fuelInDocument>) => {
  try {
    let FuelIn = await fuelInModel.find(query);
    if (!FuelIn) {
      throw new Error("No FuelIn with that id");
    }
    return await fuelInModel.deleteMany(query);
  } catch (e) {
    throw new Error(e);
  }
};
