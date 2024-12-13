const jwt = require("jsonwebtoken"); // Import JSON Web Token (JWT) library

require("dotenv").config(); // Load environment variables from .env file
const secretKey = process.env.SECRET_KEY; // Retrieve the secret key for JWT signing from environment variables

/**
 * Generate a JWT token.
 * @param {Object} data - The payload to include in the token.
 * @param {string} expiresIn - Token expiration time (e.g., "1h", "7d"). Defaults to 1 hour.
 * @returns {string} - The generated JWT token.
 * @throws {Error} - If token generation fails.
 */
const generateToken = (data, expiresIn = "1h") => {
  try {
    const options = {
      expiresIn, // Set the token's expiration time
    };

    const token = jwt.sign(data, secretKey, options); // Generate the token using the payload and secret key
    return token; // Return the generated token
  } catch (err) {
    throw new Error(err.message); // Re-throw any errors with a descriptive message
  }
};

/**
 * Decode and verify a JWT token.
 * @param {string} token - The JWT token to decode.
 * @returns {Object} - The decoded payload if the token is valid.
 * @throws {Error} - If token verification fails.
 */
const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey); // Verify and decode the token
    return decoded; // Return the decoded payload
  } catch (err) {
    throw new Error("Invalid token"); // Throw an error for invalid or expired tokens
  }
};

module.exports = {
  generateToken,
  decodeToken, // Export the functions for use in other parts of the application
};