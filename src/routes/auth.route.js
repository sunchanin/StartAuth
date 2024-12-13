const express = require("express");
const authRouter = express.Router();

const { register, login } = require("../controllers/auth.controller");

/**
 * Route to register a new user.
 * Expects user data (e.g., email, password) in the request body.
 * On success, responds with a success message and a 201 status code.
 * On failure, logs the error and responds with a 500 status code.
 */
authRouter.post("/register", async (req, res) => {
  try {
    const registerData = req.body; // Extract registration data from request body
    const response = await register(registerData); // Call the register function from auth.controller
    res.status(201).send({ status: "success", message: response }); // Respond with success
  } catch (err) {
    console.log("err: ", err); // Log error for debugging
    res.status(500).send({ status: "error", message: err.message }); // Respond with error
  }
});

/**
 * Route to log in an existing user.
 * Expects login data (e.g., email, password) in the request body.
 * On success, responds with a token and user info.
 * On failure, responds with a 401 status code and an error message.
 */
authRouter.post("/login", async (req, res) => {
  try {
    const loginData = req.body; // Extract login data from request body
    const response = await login(loginData); // Call the login function from auth.controller
    res.status(200).send(response); // Respond with the token and user info
  } catch (err) {
    res.status(401).send({ status: "error", message: err.message }); // Respond with error
  }
});

// Export the router to be used in the application
module.exports = authRouter;
