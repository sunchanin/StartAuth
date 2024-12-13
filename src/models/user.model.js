const { PrismaClient } = require("@prisma/client");

// Instantiate Prisma Client
const prisma = new PrismaClient();

/**
 * Creates a new user in the database.
 * @param {Object} user - The user object containing user details (e.g., email, password).
 * @returns {string} Success message upon successful creation.
 * @throws {Error} Throws error if email is already in use or another database error occurs.
 */
const postUser = async (user) => {
  try {
    await prisma.user.create({
      data: user, // Insert user data into the database
    });

    return "User created successfully";
  } catch (err) {
    // Handle unique constraint error for email
    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      throw new Error("A user with this email already exists.");
    } else {
      console.log(err); // Log the error for debugging
      throw new Error(err.message); // Throw the error to the calling function
    }
  }
};

/**
 * Retrieves a user by their email address.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Object|null} The user object if found, or null if no user exists with the given email.
 * @throws {Error} Throws error if a database query fails.
 */
const getUser = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email, // Find user by unique email field
      },
    });
    return user; // Return the user object or null
  } catch (err) {
    console.log("err: ", err); // Log the error for debugging
    throw new Error(err.message); // Throw the error to the calling function
  }
};

/**
 * Retrieves all users from the database.
 * @returns {Array} An array of user objects.
 * @throws {Error} Throws error if a database query fails.
 */
const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany(); // Retrieve all users from the database
    return users; // Return the list of users
  } catch (err) {
    console.log("err: ", err); // Log the error for debugging
    throw new Error(err.message); // Throw the error to the calling function
  }
};

// Export functions for use in other parts of the application
module.exports = { postUser, getUser, getAllUsers };
