const express = require("express");
const router = express.Router();

const Product = require("../db/models/productModel");

const checkToken = require("../utils");

// get product

router.get("/product", async (req, res) => {
  const { sortKey, sortValue, brand, title, maxPrice, minPrice, page, limit } =
    req.query;
  const query = {};
  if (brand) query.brand = brand;
  if (title) query.title = title;
  if (maxPrice & minPrice) query.price = { $lte: maxPrice, $gte: minPrice };

  const products = await Product.find(query)
    .populate("seller")
    .populate("category")
    .sort({ [sortKey]: sortValue })
    .limit(limit)
    .skip((page - 1) * limit);

  res
    .status(200)
    .send({ data: products, message: "Products fetched successfully" });
});

// get product using aggregate function

router.get("/product/aggregate", async (req, res) => {
  const products = await Product.aggregate([
    // { $match: { brand: "Samsung", title: "Samsung s22" } },
    // { $project: { title: 1, price: 1, description: 1, _id: 0 } },
    // { $group: { _id: "$brand", total: { $sum: 1 } } },
    // { $sort: { brand: -1 } },
    {
      $lookup: {
        from: "categories", // Category ---> categories changed category name to lowercase and plural
        localField: "category", // field name in the product schema
        foreignField: "_id", // referening to the value in the product schema
        as: "categoryData", // field name to show the category Data with product
      },
    },
  ]);
  res
    .status(200)
    .send({ data: products, message: "Products fetched successfully" });
});

// get product by id

router.get("/product/:id", async (req, res) => {
  const products = await Product.findById(req.params.id);
  res
    .status(200)
    .send({ data: products, message: "Products fetched successfully" });
});

// post product

router.post("/product", async (req, res) => {
  try {
    const product = Product({ ...req.body });
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

router.patch("/product/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send(product);
  } catch (e) {
    return res.status(404).send({ error: e });
  }
});

module.exports = router;
