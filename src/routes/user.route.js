const express = require("express");
const { httpGetAllUsers } = require("../controllers/user.controller"); // Import the controller function
const { authenticate } = require("../middleware/authentication"); // Import the authentication middleware
const userRouter = express.Router(); // Create a new Express Router

/**
 * Route to fetch all users.
 * - Protected by the `authenticate` middleware to ensure only authenticated users can access it.
 * - On success, responds with a list of users and a 200 status code.
 * - On failure, logs the error and responds with a 500 status code and error message.
 */
userRouter.get("/all", authenticate, async (req, res) => {
  try {
    const data = await httpGetAllUsers(); // Fetch all users from the controller
    res.status(200).send({ status: "success", data }); // Send success response
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message }); // Handle errors gracefully
  }
});

// Export the router to be used in the main application
module.exports = userRouter;
