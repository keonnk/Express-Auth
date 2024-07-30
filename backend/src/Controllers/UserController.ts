import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../Models/UserModel";
import verifyUser from "../middleware/VerifyUser";

export default function UserController(): express.Router {
  const router = express.Router();

  router.get("/user", async (req, res, next) => {
    try {
      //@ts-ignore
      const user_id = req.session.user; //take user id off of cookie
      const user = await User.findOne(user_id);

      if (!user) {
        throw new Error("Logged in user not found in system");
      }

      return res.send(user);
    } catch (err) {
      next(err);
    }
  });

  router.post("/signup", async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new Error("Missing username or password");
      }

      const hashedPassword = bcrypt.hashSync(password);

      await User.create({ username, password: hashedPassword });

      return res.status(201).send("User successfully created");
    } catch (err) {
      next(err);
    }
  });

  router.post("/login", async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new Error("Missing username or password");
      }

      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("Account does not exist");
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        throw new Error("Password does not match");
      }

      //@ts-ignore
      req.session.user = user._id;

      return res.send("User logged in");
    } catch (err) {
      next(err);
    }
  });

  router.post("/logout", async (req, res, next) => {
    try {
      req.session.destroy(() => {});

      return res.send("User logged out");
    } catch (err) {
      next(err);
    }
  });

  return router;
}
