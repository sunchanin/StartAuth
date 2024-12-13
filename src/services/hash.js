const bcrypt = require("bcryptjs"); // Import bcrypt.js for password hashing and comparison

require("dotenv").config(); // Load environment variables from .env file
const rounds = Number(process.env.ROUNDS); // Get the number of hashing rounds from the environment variables

/**
 * Hash a plain text password.
 * @param {string} plainPassword - The plain text password to be hashed.
 * @returns {Promise<string>} - The hashed password.
 * @throws {Error} - Throws an error if hashing fails.
 */
const hashPassword = async (plainPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, rounds); // Hash the password using bcrypt and the specified number of rounds
    return hashedPassword; // Return the hashed password
  } catch (err) {
    console.log("err: ", err); // Log the error for debugging purposes
    throw new Error(err.message); // Re-throw the error with a descriptive message
  }
};

/**
 * Compare a plain text password with a hashed password.
 * @param {string} plainPassword - The plain text password to be compared.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - Returns true if the passwords match, otherwise false.
 * @throws {Error} - Throws an error if comparison fails.
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword); // Compare the plain password with the hashed password
    return isMatch; // Return the comparison result
  } catch (err) {
    console.log("err: ", err); // Log the error for debugging purposes
    throw new Error(err.message); // Re-throw the error with a descriptive message
  }
};

module.exports = { hashPassword, comparePassword }; // Export the functions for use in other parts of the application
