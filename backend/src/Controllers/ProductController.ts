import express from "express";
import { Product } from "../Models/ProductModel.js";
import verifyUser from "../middleware/VerifyUser.js";

export default function ProductController(): express.Router {
  const router = express.Router();

  /*GET all products*/
  router.get("/", verifyUser, async (req, res, next) => {
    try {
      const products = await Product.find();
      return res.send(products);
    } catch (err) {
      next(err);
    }
  });

  /*GET product by id*/
  router.get("/:id", verifyUser, async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id });

      if (!product) {
        throw new Error("Product does not exist");
      }

      return res.send(product);
    } catch (err) {
      next(err);
    }
  });

  /*POST: create new product*/
  router.post("/", verifyUser, async (req, res, next) => {
    try {
      const { name, price, description } = req.body;

      if (!name || !price || !description) {
        throw new Error("Missing product fields");
      }

      const product = await Product.create({ name, price, description });

      return res.send(product); //Return newly created product
    } catch (err) {
      next(err);
    }
  });

  /*PUT: update existing product*/
  router.put("/:id", verifyUser, async (req, res, next) => {
    try {
      const { name, price, description } = req.body;
      const { id } = req.params;

      const updateRes = await Product.updateOne(
        { _id: id },
        { name, price, description }
      );

      return res.send(updateRes);
    } catch (err) {
      next(err);
    }
  });

  /*DELETE existing product*/
  router.delete("/:id", verifyUser, async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleteRes = await Product.deleteOne({ _id: id });

      return res.send(deleteRes);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
