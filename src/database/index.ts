import { DataSource } from "typeorm";
import { logger } from "../utils/logger";
import getConfig from "../utils/config";
import { Student } from "./models/student.model";
const config = getConfig(process.env.NODE_ENV);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.postgresHost,
  port: parseInt(config.postgresPort ?? "5432"),
  username: config.postgresUser,
  password: config.postgresPassword,
  database: config.postgresDb,
  entities: [Student],
  synchronize: true, // Disable in production
  logging: ["error"],
});
export default class ConnectPostgres {
  private static instance: ConnectPostgres;
  private dataSource!: DataSource;

  private constructor() {}

  public static getInstance(): ConnectPostgres {
    if (!ConnectPostgres.instance) {
      ConnectPostgres.instance = new ConnectPostgres();
    }
    return ConnectPostgres.instance;
  }

  public async connect() {
    try {
      await AppDataSource.initialize();
      logger.info("Successfully connected to Postgres");
      logger.info("All models were synchronized successfully.");
    } catch (error: any) {
      logger.error("Initial Postgres connection error", {
        error: error.message,
        stack: error.stack,
      });
      console.error("Error details:", error);
      throw error; // Rethrow the error to handle it in the caller function
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.dataSource.destroy();
      logger.info("Postgres disconnected");
    } catch (error: any) {
      logger.error("Error during Postgres disconnection", {
        error: error.message,
        stack: error.stack,
      });
    }
  }

  public getDataSourceInstance(): DataSource {
    if (!this.dataSource) {
      throw new Error("Database connection is not established yet.");
    }
    return this.dataSource;
  }
}
