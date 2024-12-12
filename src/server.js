require("dotenv").config();
const PORT = process.env.PORT;

const app = require("./app");
const http = require("http");
const server = http.createServer(app);

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing Prisma Client");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing Prisma Client");
  await prisma.$disconnect();
  process.exit(0);
}); 


server
  .listen(PORT, () => console.log(`Server listening at PORT ${PORT}`))
  .on("error", (err) =>
    console.error(`Server failed to start: ${err.message}`)
  );