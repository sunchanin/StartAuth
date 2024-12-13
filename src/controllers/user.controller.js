// Import the `getAllUsers` function from the user model
const { getAllUsers } = require("../models/user.model");

/**
 * Fetches all users from the database.
 * - Retrieves a list of all users stored in the database.
 * 
 * @returns {Promise<Array>} - An array of user objects.
 * @throws {Error} - Throws an error if the database query fails.
 */
const httpGetAllUsers = async () => {
  try {
    // Call the getAllUsers function to fetch user data
    const users = await getAllUsers();
    return users; // Return the fetched users
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);
    // Throw a new error with the error message
    throw new Error(err.message);
  }
};

// Export the httpGetAllUsers function for use in other parts of the application
module.exports = { httpGetAllUsers };