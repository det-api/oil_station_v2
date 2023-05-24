import { updateNozzleSerialHandler } from "../controller/nozzle.controller";

const testRoute = require("express").Router();

testRoute.post("/", updateNozzleSerialHandler);

export default testRoute;
