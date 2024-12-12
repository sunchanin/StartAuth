const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));

const cors = require("cors");
const corsOptions = {
  origin: process.env.CORS || "",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

const helmet = require("helmet");
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

app.use("/auth", authRouter);
app.use("/user", userRouter);

module.exports = app;
