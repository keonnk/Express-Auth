import express from "express";
import { User } from "../Models/UserModel.js";

export default function verifyUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    //@ts-ignore
    const { user } = req.session;
    console.log("user: ", user);

    if (!user) {
      throw new Error(
        "Access Forbidden: No user is logged in or cookie is stale"
      );
    }

    if (!User.findOne({ _id: user })) {
      throw new Error(
        "Access Forbidden: UserId does not match any existing users"
      );
    }

    next();
  } catch (err) {
    next(err);
  }
}
