import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import loggerMiddleware from "./middlewares/logger-handler";
// import { studentRoutes } from "./routes/student.routes";
import bodyParser from "body-parser";
import { stdRoute } from "./routes/student.route";

export const app = express();

// Get the Configs!
// const config = getConfig(process.env.NODE_ENV);
app.use(express.json());
// Use body-parser to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/student", stdRoute);
app.use(loggerMiddleware);

// Global Error Handler
app.use(errorHandler);
