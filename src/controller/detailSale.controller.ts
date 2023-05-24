import { Request, Response, NextFunction } from "express";
import fMsg from "../utils/helper";
import {
  getDetailSale,
  addDetailSale,
  updateDetailSale,
  deleteDetailSale,
} from "../service/detailSale.service";
import {
  calcFuelBalance,
  updateFuelBalance,
} from "../service/fuelBalance.service";

export const getDetailSaleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await getDetailSale(req.query);
    fMsg(res, "DetailSale are here", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const addDetailSaleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let check = await getDetailSale({ vocono: req.body.vocono });
    if (check.length != 0) {
      fMsg(res);
      return;
    }
    let result = await addDetailSale(req.body);
    if (!result) {
      throw new Error("error in detai");
    }
    await calcFuelBalance(
      { fuelType: result.fuelType, createAt: result.dailyReportDate },
      { liter: result.saleLiter },
      result.nozzleNo
    );

    fMsg(res, "New DetailSale data was added", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const updateDetailSaleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await updateDetailSale(req.query, req.body);
    fMsg(res, "updated DetailSale data", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const deleteDetailSaleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteDetailSale(req.query);
    fMsg(res, "DetailSale data was deleted");
  } catch (e) {
    next(new Error(e));
  }
};
