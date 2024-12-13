const express = require("express");
const app = express();

// Middleware for parsing JSON request bodies with a size limit
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" })); // Allows large JSON payloads up to 50MB

// CORS setup
const cors = require("cors");
const corsOptions = {
  origin: process.env.CORS || "", // Restrict allowed origins for better security
  allowedHeaders: ["Content-Type", "Authorization"], // Specify headers allowed in requests
  credentials: true, // Enable credentials for cross-origin requests
};
app.use(cors(corsOptions)); // Apply CORS middleware

// Helmet setup for security
const helmet = require("helmet");
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Restrict all resources to be loaded only from the same origin
    },
  })
);

// Rate limiting to prevent abuse
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 60, // Allow a maximum of 60 requests per minute per IP
  message: "Too many requests, please try again later.", // Error message for excessive requests
});
app.use(limiter); // Apply rate-limiting middleware

// Route imports
const authRouter = require("./routes/auth.route"); // Authentication-related routes
const userRouter = require("./routes/user.route"); // User-related routes

// Apply route-specific middleware
app.use("/auth", authRouter); // Routes for authentication functionalities
app.use("/user", userRouter); // Routes for user functionalities

// Export the Express app for use in other files
module.exports = app;
