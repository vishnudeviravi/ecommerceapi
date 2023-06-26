const express = require("express");
const router = express.Router();
const User = require("../db/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// post user

router.post("/sign-up", async (req, res) => {
  try {
    const userData = { ...req.body };
    if (userData.password != userData.confirmPassword) {
      return res.status(401).send({ error: "Passwords dont match" });
    }
    const saltRounds = 2; //==> how many times we want to encrypt the password
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const user = User({ ...userData, password: hashedPassword });
    await user.save();
    return res.status(201).send(user);
  } catch (e) {
    return res.status(404).send({ error: e });
  }
});

// user login

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send({ message: "username or password wrong" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    return res.status(200).send({ message: "Login successful", token: token });
  } catch (e) {
    return res.status(404).send({ error: e, message: "Cannot login" });
  }
});

// get user

router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (e) {
    return res.status(404).send({ error: e });
  }
});

// get user by id

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ err: "User not found" });
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(404).send({ err });
  }
});

// update user

router.patch("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send({ error: e });
  }
});

// delete user

router.delete("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({ message: "success" });
  } catch (err) {
    return res.status(404).send({ err });
  }
});

module.exports = router;
