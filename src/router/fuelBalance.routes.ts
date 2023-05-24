import {
  addFuelBalanceHandler,
  deleteFuelBalanceHandler,
  getAllFuelBalanceHandler,
  getFuelBalanceHandler,
  updateFuelBalanceHandler,
} from "../controller/fuelBalance.controller";
import { hasAnyPermit } from "../middleware/permitValidator";
import { roleValidator } from "../middleware/roleValidator";
import { validateAll, validateToken } from "../middleware/validator";
// import { allSchemaId, FuelBalanceSchema } from "../schema/scheama";
const fuelBalanceRoute = require("express").Router();

fuelBalanceRoute.get("/", getFuelBalanceHandler);
fuelBalanceRoute.post(
  "/",
  validateToken,
  roleValidator("admin"),
  hasAnyPermit(["add"]),
  // validateAll(FuelBalanceSchema),
  addFuelBalanceHandler
);
fuelBalanceRoute.get("/all", getAllFuelBalanceHandler);
fuelBalanceRoute.patch("/", updateFuelBalanceHandler);
fuelBalanceRoute.delete("/", deleteFuelBalanceHandler);

export default fuelBalanceRoute;
