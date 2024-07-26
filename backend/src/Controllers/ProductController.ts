import express from "express";

export default function ProductController(): express.Router {
  const router = express.Router();

  /*GET all products*/
  router.get("/", async (req, res, next) => {});

  /*GET product by id*/
  router.get("/:id", async (req, res, next) => {});

  /*POST: create new product*/
  router.post("/", async (req, res, next) => {});

  /*PUT: update existing product*/
  router.put("/:id", async (req, res, next) => {});

  /*DELETE existing product*/
  router.delete("/:id", async (req, res, next) => {});

  return router;
}
