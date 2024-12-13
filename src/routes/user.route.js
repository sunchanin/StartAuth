const express = require("express");
const { httpGetAllUsers } = require("../controllers/user.controller");
const { authenticate } = require("../middleware/authentication");
const userRouter = express.Router();

userRouter.get("/all", authenticate, async (req, res) => {
  try {
    const data = await httpGetAllUsers();
    res.status(200).send({ status: "success", data });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

module.exports = userRouter;
