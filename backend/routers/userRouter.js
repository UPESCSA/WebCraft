import express from "express";

import {
  CREATEUSER,
  UPDATEUSER,
  READUSER,
  DELETEUSER,
} from "../controllers/allianceController.js";

const UserRouter = express.Router();

UserRouter.route("/")
  .get(READUSER)
  .post(CREATEUSER)
  .put(UPDATEUSER)
  .delete(DELETEUSER);

export { UserRouter as USERROUTER };
