import { Server } from "http";
import app from "./app";
import config from "./App/config";

let server: Server;
async function main() {
  try {
    server = app.listen(config.PORT, () => {
      console.log("Server is running on port", config.PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
