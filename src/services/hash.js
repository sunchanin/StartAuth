const bcrypt = require("bcryptjs");

require("dotenv").config();
const rounds = Number(process.env.ROUNDS);

const hashPassword = async (plainPassword) => {
  try {
    const hashPassword = await bcrypt.hash(plainPassword, rounds);
    return hashPassword;
  } catch (err) {
    console.log("err: ", err);
    throw new Error(err.message);
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (err) {
    console.log("err: ", err);
    throw new Error(err.message);
  }
};

module.exports = { hashPassword, comparePassword };
