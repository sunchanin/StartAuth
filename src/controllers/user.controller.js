const { getAllUsers } = require("../models/user.model");

const httpGetAllUsers = async () => {
  try {
    const users = await getAllUsers();
    return users;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

module.exports = { httpGetAllUsers };
