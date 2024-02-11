import express from "express";

import {
  CREATE_USER,
  UPDATE_USER,
  READ_USER,
  DELETE_USER,
} from "../controllers/userController";

const UserRouter = express.Router();

UserRouter.route("/")
  .get(READUSER)
  .post(CREATEUSER)
  .put(UPDATEUSER)
  .delete(DELETEUSER);

export { UserRouter as USERROUTER };
