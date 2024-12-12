const { postUser, getUser } = require("../models/user.model");
const { hashPassword, comparePassword } = require("../services/hash");
const { generateToken } = require("../services/token");

const register = async (user) => {
  try {
    user.password = await hashPassword(user.password);

    const res = await postUser(user);
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
};

const login = async (loginData) => {
  try {
    const user = await getUser(loginData.email);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isValidPassword = await comparePassword(
      loginData.password,
      user.password
    );
    if (!isValidPassword) {
      throw new Error("Invalid username or password");
    }

    const payload = { id: user.id };
    const token = generateToken(payload);

    const response = { email: user.email, token };
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { register, login };
