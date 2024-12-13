// Import necessary modules and services
const { postUser, getUser } = require("../models/user.model");
const { hashPassword, comparePassword } = require("../services/hash");
const { generateToken } = require("../services/token");

/**
 * Registers a new user.
 * - Hashes the user's password for secure storage.
 * - Calls the `postUser` function to save the user in the database.
 * 
 * @param {Object} user - The user object containing email and password.
 * @returns {Promise<string>} - A success message.
 * @throws {Error} - Throws an error if user registration fails.
 */
const register = async (user) => {
  try {
    // Hash the user's password before saving
    user.password = await hashPassword(user.password);

    // Save the user in the database
    const res = await postUser(user);
    return res;
  } catch (err) {
    // Throw an error if the registration process fails
    throw new Error(err.message);
  }
};

/**
 * Logs in a user.
 * - Retrieves the user from the database using their email.
 * - Verifies the provided password matches the stored hashed password.
 * - Generates a token if authentication is successful.
 * 
 * @param {Object} loginData - The login credentials (email and password).
 * @returns {Promise<Object>} - An object containing the user's email and JWT token.
 * @throws {Error} - Throws an error if authentication fails.
 */
const login = async (loginData) => {
  try {
    // Fetch the user by email
    const user = await getUser(loginData.email);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    // Compare the provided password with the hashed password in the database
    const isValidPassword = await comparePassword(
      loginData.password,
      user.password
    );
    if (!isValidPassword) {
      throw new Error("Invalid username or password");
    }

    // Generate a token for the authenticated user
    const payload = { id: user.id, email: user.email };
    const token = generateToken(payload);

    // Return the user's email and token as the response
    const response = { email: user.email, token };
    return response;
  } catch (err) {
    // Throw an error if the login process fails
    throw new Error(err.message);
  }
};

// Export the register and login functions for use in other parts of the application
module.exports = { register, login };