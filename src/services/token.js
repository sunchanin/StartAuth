const jwt = require("jsonwebtoken");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const generateToken = (data, expiresIn = "1h") => {
  try {
    const options = {
      expiresIn,
    };

    const token = jwt.sign(data, secretKey, options);
    return token;
  } catch (err) {
    throw new Error(err.message);
  }
};

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

module.exports = {
  generateToken,
  decodeToken,
};
