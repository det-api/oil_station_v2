import { Request, Response, NextFunction } from "express";
import fMsg, { previous } from "../utils/helper";
import moment, { MomentTimezone } from "moment-timezone";
import {
  getFuelBalance,
  addFuelBalance,
  updateFuelBalance,
  deleteFuelBalance,
} from "../service/fuelBalance.service";
import { fuelBalanceDocument } from "../model/fuelBalance.model";

const currentDate = moment().tz("Asia/Yangon").format("YYYY-MM-DD");

export const getAllFuelBalanceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await getFuelBalance(req.query);
    fMsg(res, "FuelIn are here", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const getFuelBalanceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let sDate = req.query.sDate?.toString();
    if (!sDate ) {
      throw new Error("you need date");
    }
    if(sDate != currentDate){
      throw new Error("you can't get that date");
    }
    let cDate = new Date(sDate);
    let result = await getFuelBalance({ createAt: sDate });
    if (result.length != 0) {
    fMsg(res, "fuelBalance are here", result);
    return;
    }
    //before date
    let prevDate = previous(cDate);
    let prevResult = await getFuelBalance({ createAt: prevDate });
  
    await Promise.all(
    prevResult.map(async (ea) => {
        let obj   = {
            stationId : '6464e9f1c45b82216ab1db6b',
            fuelType : ea.fuelType,
            capacity : ea.capacity,
            opening :  ea.balance,
            createAt : sDate
        } as fuelBalanceDocument

        await addFuelBalance(obj)
    }))

    let final = await getFuelBalance({ createAt: sDate });
   fMsg(res , 'fuelBalance created and find' ,final)
  } catch (e) {
    next(new Error(e));
  }
};

export const addFuelBalanceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await addFuelBalance(req.body);
    fMsg(res, "New fuelBalance data was added", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const updateFuelBalanceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await updateFuelBalance(req.query, req.body);
    fMsg(res, "updated fuelBalance data", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const deleteFuelBalanceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteFuelBalance(req.query);
    fMsg(res, "fuelBalance data was deleted");
  } catch (e) {
    next(new Error(e));
  }
};
