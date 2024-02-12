import express from "express";

import {
  CREATEUSER,
  UPDATEUSER,
  READUSER,
  DELETEUSER,
  LOGINUSER,
} from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.route("/")
  .get(READUSER)
  .post(CREATEUSER)
  .put(UPDATEUSER)
  .delete(DELETEUSER);

UserRouter.route("/login")
  .post(LOGINUSER)
export { UserRouter as USERROUTER };
