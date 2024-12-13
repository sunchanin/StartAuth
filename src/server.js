require("dotenv").config(); // Load environment variables from .env file
const PORT = process.env.PORT; // Fetch the port number from environment variables

const app = require("./app"); // Import the Express app
const http = require("http");
const server = http.createServer(app); // Create an HTTP server

// Handle application shutdown gracefully for Prisma
process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing Prisma Client");
  await prisma.$disconnect(); // Disconnect Prisma Client to release resources
  process.exit(0); // Exit the process
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing Prisma Client");
  await prisma.$disconnect(); // Disconnect Prisma Client to release resources
  process.exit(0); // Exit the process
});

// Start the server and handle errors during startup
server
  .listen(PORT, () => console.log(`Server listening at PORT ${PORT}`)) // Listen for incoming requests
  .on("error", (err) => // Handle server errors during startup
    console.error(`Server failed to start: ${err.message}`)
  );