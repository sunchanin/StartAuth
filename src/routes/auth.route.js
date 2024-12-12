const express = require("express");
const authRouter = express.Router();

const { register, login } = require("../controllers/auth.controller");

authRouter.post("/register", async (req, res) => {
  try {
    const registerData = req.body;
    const response = await register(registerData);
    res.status(201).send({ status: "success", message: response });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).send({ status: "error", message: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const loginData = req.body;
    const response = await login(loginData);
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ status: "error", message: err.message });
  }
});

module.exports = authRouter;
