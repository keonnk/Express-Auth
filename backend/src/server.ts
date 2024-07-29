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
  const SECRET = process.env.SECRET;
  const MONGO_URI = process.env.MONGO_URI;
  const FRONTEND_URL = process.env.FRONTEND_URL;
  const DEV_ENV = process.env.DEV_ENV ?? 1;

  await mongoose.connect(MONGO_URI);

  app.use(cors({ credentials: true, origin: FRONTEND_URL }));
  app.use(express.json());

  app.use(
    session({
      secret: SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
      }),
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: DEV_ENV ? false : true,
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
