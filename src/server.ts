import ConnectPostgres from "./database"; // Adjust path as needed
import getConfig from "./utils/config";
import { logInit, logger } from "./utils/logger";
import { app } from "./app";

export async function run() {
  try {
    const config = getConfig(process.env.NODE_ENV);

    // Activate Logger
    logInit({ env: config.env, logLevel: config.logLevel });

    // Activate Database
    const postgres = ConnectPostgres.getInstance();
    await postgres.connect();

    // Set up your express routes, middleware, etc.
    // e.g., app.use('/api/books', bookRoutes);

    // Start Server
    const server = app.listen(config.port, () => {
      logger.info(`Server is listening on port: ${config.port}`);
    });

    const exitHandler = async () => {
      if (server) {
        server.close(async () => {
          logger.info("Server closed!");
          await postgres.disconnect();
          logger.info("Postgres disconnected!");
          // Gracefully Terminate
          process.exit(1); // terminate the process due to error
        });
      } else {
        await postgres.disconnect(); // In case the server isn't running but DB needs to be disconnected
        logger.info("Postgres disconnected.");
        process.exit(1);
      }
    };

    const unexpectedErrorHandler = (error: unknown) => {
      logger.error("Unhandled error", { error });
      exitHandler();
    };

    // Error that might occur during execution that not caught by any try/catch blocks
    process.on("uncaughtException", unexpectedErrorHandler); // Synchronous
    process.on("unhandledRejection", unexpectedErrorHandler); // Asynchronous
    // A termination signal typically sent from OS or other software (DOCKER, KUBERNETES)
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received");
      if (server) {
        // Stop the server from accepting new requests but keeps existing connection open until all ongoing requests are done
        server.close();
      }
    });
  } catch (error) {
    logger.error("Failed to initialize application", { error });
    process.exit(1);
  }
}

run();
