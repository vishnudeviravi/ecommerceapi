const express = require("express");
const router = express.Router();
const Category = require("../db/models/categoryModel");
const checkToken = require("../utils");

// post category

router.post("/category", async (req, res) => {
  try {
    const category = Category({ ...req.body });
    await category.save();
    return res.status(201).send(category);
  } catch (e) {
    return res.status(404).send({ err: e });
  }
});

// get category

router.get("/category", checkToken, async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).send(categories);
  } catch (e) {
    return res.status(404).send({ error: e });
  }
});

// get category by id

router.get("/category/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  return res.status(200).send(category);
});

// update category

router.patch("/category/:id", async (req, res) => {
  const categories = await Category.findByIdAndUpdate(req.params.id);
  return res.status(200).send(categories);
});

//delete category

router.delete("/category/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send({ message: "Category successfully deleted" });
  } catch (e) {
    return res.status(404).send({ e });
  }
});

module.exports = router;
