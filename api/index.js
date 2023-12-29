import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("connected to MongoDB!"))
  .catch((e) => console.log(e));

const app = express();

const port = 3000;

app.listen(port, () => console.log(`server is running at port nuber ${port}`));
