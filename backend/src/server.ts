import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import UserController from "./Controllers/UserController";
import ProductController from "./Controllers/ProductController";

async function main() {
  const app = express();
  dotenv.config();
  const PORT = process.env.PORT;
  const MONGO_URI = process.env.MONGO_URI;

  await mongoose.connect(MONGO_URI);

  app.use(cors({ credentials: true }));
  app.use(express.json());

  app.use(
    session({
      secret: "my secret",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
      }),
      cookie: {
        secure: false,
      },
    })
  );

  app.use("/", UserController());
  app.use("/product", ProductController());

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
