import { Request, Response, NextFunction, Router } from "express";
import { StudentController } from "src/controllers/student.controller";

export const stdRoute = Router();
const stdController = new StudentController();

stdRoute.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await stdController.createStudent(req, res, next);
  } catch (error) {
    next(error);
  }
});

stdRoute.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await stdController.findStudentByQuery(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);
stdRoute.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await stdController.getAllStudent(req, res, next);
  } catch (error) {
    next(error);
  }
});

stdRoute.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await stdController.getStudentById(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

stdRoute.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await stdController.updateStudent(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

stdRoute.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await stdController.deleteStudent(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);
