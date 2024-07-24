import { NextFunction, Router } from "express";
import { StudentController } from "src/controllers/student.controller";

export const stdRoute = Router();
const stdController = new StudentController();

stdRoute.post("/", async (req, res, next: NextFunction) => {
  try {
    await stdController.createStudent(req, res, next);
  } catch (error) {
    next(error);
  }
});
