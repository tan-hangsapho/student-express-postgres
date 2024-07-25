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
      return res
        .status(StatusCode.Created)
        .send({ message: "Student created successfully", data: newStd });
    } catch (error) {
      next(error);
    }
  }
  async getAllStudent(_req: Request, res: Response, next: NextFunction) {
    try {
      const students = await this.student.getAllStudents();
      return res
        .status(StatusCode.OK)
        .send({ message: "GET All successfully", data: students });
    } catch (error) {
      next(error);
    }
  }
  async getStudentById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const std = await this.student.getStudentById(id);
      return res
        .status(StatusCode.OK)
        .send({ message: "GET Student by ID successfully", data: std });
    } catch (error) {
      next(error);
    }
  }
  async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const std = req.body;
      const updateStudent = await this.student.updateStudent(id, std);
      return res
        .status(StatusCode.OK)
        .send({ message: "UPDATE Student successfully", data: updateStudent });
    } catch (error) {
      next(error);
    }
  }
  async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await this.student.deleteStudent(id);
      return res
        .status(StatusCode.NoContent)
        .send({ message: "DELETE Student successfully" });
    } catch (error) {
      next(error);
    }
  }
}
