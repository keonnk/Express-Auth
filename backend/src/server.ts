import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'

async function main() {
  const app = express();
  dotenv.config();
  const PORT = process.env.PORT
  const MONGO_URI = process.env.MONGO_URI

  await mongoose.connect(MONGO_URI);

  app.use(express.json());

  app.get("/", (req, res, next) => {
    res.send("Hello World!");
  });


  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
