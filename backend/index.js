// MODULES IMPORT
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Database } from "./config/database.js";

// ROUTERS
import { BLOGROUTER } from "./routers/blogRouter.js";
import { USERROUTER } from "./routers/userRouter.js";
import { FRONTENDRouter } from "./routers/FRONTENDRouter.js";

// CONFIG
dotenv.config();

// CONSTANTS
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://webcraft:QFylW6JBelIW57Hl@basedb.jpdcqyt.mongodb.net/?retryWrites=true&w=majority';

// INTIALIZING EXPRESS
const app = express();

// DATABASE
const database = new Database(MONGODB_URI);
database.connect();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// TEST ROUTE
app.use("/api/test", (req, res) => {
  res.send("Server ✅");
});

//ROUTES
app.use("/api/blog", BLOGROUTER);
app.use("/api/user", USERROUTER);

//Frontend
app.use('/', FRONTENDRouter);
// DATABASE DISCONNECTION
process.on("SIGINT", () => {
  database
    .disconnect()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
});

// LISTEN
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});
