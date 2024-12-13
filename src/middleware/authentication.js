const { getUser } = require("../models/user.model");
const { decodeToken } = require("../services/token");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send({
      status: "error",
      message: "Authentication token missing or malformed",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = decodeToken(token);
    const userFromToken = decodedToken;
    const user = await getUser(userFromToken.email);
    if (!user) {
      res
        .status(401)
        .send({ status: "error", message: "Invalid or expired token" });
    }

    req.payload = decodedToken;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ status: "error", message: "Invalid or expired token" });
  }
};

module.exports = { authenticate };
