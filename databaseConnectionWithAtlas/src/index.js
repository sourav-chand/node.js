import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
// nodemon -r dotenv/config --experimental-json-modules src/index.js
import connectDB from "./db/index.js";
import express from "express";
const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
