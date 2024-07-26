import express from "express";

export default function UserController(): express.Router {
  const router = express.Router();

  router.post("/signup", async (req, res) => {});

  router.post("/login", async (req, res) => {});

  return router;
}
