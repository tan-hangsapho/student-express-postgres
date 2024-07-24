import { Response, Request, NextFunction } from "express";
import { StudentService } from "src/services/student.service";
import { StatusCode } from "src/utils/const/status-code";

export class StudentController {
  private student: StudentService;
  constructor() {
    this.student = new StudentService();
  }
  async createStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const std = req.body;
      const newStd = await this.student.createStudent(std);
      res
        .status(StatusCode.Created)
        .send({ message: "Student created successfully", data: newStd });
    } catch (error) {
      next(error);
    }
  }
}
