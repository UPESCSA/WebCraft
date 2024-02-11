import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { genSalt, hash, compare } from "bcrypt";
import { GENERATETOKEN } from "../middlewares/jwtAuthMW.js";

// ENVIRONMENT VARIABLES
dotenv.config();

// CONSTANTS
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);
const fields = {
  __v: 0,
  password: 0,
  created_at: 0,
  updated_at: 0,
};

// DATABASE CONTROLLERS

import {
  CREATEUSERDB,
  READUSERDB,
  UPDATEUSERDB,
  DELETEUSERDB,
} from "./database/userDatabase.js";

// CONTROLLERS

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const query = { email };

    const salt = await genSalt(SALT_ROUNDS);
    const hashedPassword = await hash(password, salt);

    const userExists = await READUSERDB(query);
    if (userExists.length > 0) {
      return res.status(StatusCodes.CONFLICT).send("User Already Exists!");
    }

    const user = await CREATEUSERDB({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      console.log("User Created Successfully", { user });
      return res.status(StatusCodes.CREATED).send("User Created Successfully");
    } else {
      console.log("Error Creating User");
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  } catch (error) {
    console.log("Error Creating User", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readUser = async (req, res) => {
  try {
    const query = { _id: req.user.user_id };
    const user = await READUSERDB(query, fields);
    if (user.length > 0) {
      console.log("User Found", { user });
      return res.status(StatusCodes.OK).send(user);
    } else {
      console.log("User Not Found", { user });
      return res.status(StatusCodes.NOT_FOUND).send("User Not Found");
    }
  } catch (error) {
    console.log("Error Reading User", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const query = { _id: req.user.user_id };
    const data = req.body;
    const user = await UPDATEUSERDB(query, data, fields);
    if (user) {
      console.log("User Updated", { user });
      return res.status(StatusCodes.OK).send(user);
    } else {
      console.log("User Not Updated", { user });
      return res.status(StatusCodes.NOT_FOUND).send("User Not Updated");
    }
  } catch (error) {
    console.log("Error Updating User", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const query = { _id: req.user.user_id };
    const user = await DELETEUSERDB(query);
    if (user) {
      console.log("User Deleted", { user });
      return res.status(StatusCodes.OK).send("User Deleted");
    } else {
      console.log("User Not Deleted", { user });
      return res.status(StatusCodes.NOT_FOUND).send("User Not Deleted");
    }
  } catch (error) {
    console.log("Error Deleting User", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const query = { email };

  const user = await READUSERDB(query);

  if (user.length > 0) {
    const validPassword = await compare(password, user[0].password);
    if (validPassword) {
      let payload = { user_id: user[0]._id, email };
      const { token, refreshToken } = GENERATETOKEN(payload);
      payload = {
        user_id: user[0]._id,
        username: user[0].username,
        messages: user[0].messages,
      };
      console.log("User Logged In", { user });
      return res.status(StatusCodes.OK).json({ token, refreshToken, payload });
    } else {
      console.log("User not Authorized");
      return res.status(StatusCodes.UNAUTHORIZED).send("User not Authorized");
    }
  } else {
    console.log("User Not Found");
    return res.status(StatusCodes.NOT_FOUND).send("User Not Found");
  }
};

export {
  createUser as CREATEUSER,
  readUser as READUSER,
  updateUser as UPDATEUSER,
  deleteUser as DELETEUSER,
  loginUser as LOGINUSER,
};
