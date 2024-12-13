// Import the necessary functions and modules
const { getUser } = require("../models/user.model");
const { decodeToken } = require("../services/token");

/**
 * Middleware to authenticate users using a Bearer token.
 * 
 * Steps:
 * 1. Validate if the authorization header exists and is correctly formatted.
 * 2. Decode the token and verify its validity.
 * 3. Retrieve the user from the database based on the token's payload.
 * 4. If validation succeeds, attach the payload to the `req` object and proceed.
 * 5. If any step fails, return a 401 Unauthorized response with a descriptive message.
 */
const authenticate = async (req, res, next) => {
  // Extract the Authorization header from the request
  const authHeader = req.headers["authorization"];

  // Check if the Authorization header is present and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send({
      status: "error",
      message: "Authentication token missing or malformed", // Return error if token is missing or malformed
    });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Decode the token to retrieve the payload
    const decodedToken = decodeToken(token);
    const userFromToken = decodedToken;

    // Fetch the user from the database based on the email in the token payload
    const user = await getUser(userFromToken.email);

    // If the user doesn't exist, return an error response
    if (!user) {
      return res.status(401).send({
        status: "error",
        message: "Invalid or expired token", // Return error if user is not found
      });
    }

    // Attach the decoded token payload to the request object for downstream use
    req.payload = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle token decoding errors or unexpected exceptions
    return res.status(401).send({
      status: "error",
      message: "Invalid or expired token", // Return error for invalid or expired tokens
    });
  }
};

// Export the middleware function for use in other parts of the application
module.exports = { authenticate };