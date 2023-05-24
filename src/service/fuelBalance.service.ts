import { FilterQuery, UpdateQuery } from "mongoose";
import fuelBalanceModel, {
  fuelBalanceDocument,
} from "../model/fuelBalance.model";

export const getFuelBalance = async (
  query: FilterQuery<fuelBalanceDocument>
) => {
  try {
    return await fuelBalanceModel
      .find(query)
      .lean()
      .populate("stationId")
      .select("-__v");
  } catch (e) {
    throw new Error(e);
  }
};

export const addFuelBalance = async (body: fuelBalanceDocument) => {
  try {
    return await new fuelBalanceModel(body).save();
  } catch (e) {
    throw new Error(e);
  }
};

export const updateFuelBalance = async (
  query: FilterQuery<fuelBalanceDocument>,
  body: UpdateQuery<fuelBalanceDocument>
) => {
  try {
    // await fuelBalanceModel.updateMany(query, body);
    let result = await fuelBalanceModel.find(query).lean();
    if (result.length == 0) {
      throw new Error("not work");
    }
    let cashLiter = result[0].cash + body.liter;
    let obj = {
      cash: cashLiter,
      balance: result[0].opening - cashLiter,
    };
    await fuelBalanceModel.updateMany(query, obj);
    return await fuelBalanceModel.find(query).lean();
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteFuelBalance = async (
  query: FilterQuery<fuelBalanceDocument>
) => {
  try {
    let fuelBalance = await fuelBalanceModel.find(query);
    if (!fuelBalance) {
      throw new Error("No fuelBalance with that id");
    }

    return await fuelBalanceModel.deleteMany(query);
  } catch (e) {
    throw new Error(e);
  }
};

export const calcFuelBalance = async (query, body, payload) => {
  try {
    // await fuelBalanceModel.updateMany(query, body);
    let result = await fuelBalanceModel.find(query).lean();
    if (result.length == 0) {
      throw new Error("not work");
    }
    let gg = result.find((ea) => ea["nozzles"].includes(payload.toString()) == true);
    console.log(gg)
    let cashLiter = gg?.cash + body.liter;
    let obj = {
      cash: cashLiter,
      balance: result[0].opening - cashLiter,
    };
    await fuelBalanceModel.updateMany({_id : gg?._id}, obj);
    return await fuelBalanceModel.find({_id : gg?._id}).lean();
  } catch (e) {
    throw new Error(e);
  }
};
