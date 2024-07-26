import {
  IStudent,
  QueryParams,
} from "src/database/repositories/@types/student.type";
import { StudentRepository } from "src/database/repositories/student.repo";
import APIError from "src/errors/api-error";
import { StatusCode } from "src/utils/const/status-code";

export class StudentService {
  private studentRepo: StudentRepository;
  constructor() {
    this.studentRepo = new StudentRepository();
  }
  async createStudent(std: IStudent) {
    try {
      return await this.studentRepo.createStudent(std);
    } catch (error) {
      throw error;
    }
  }
  async findStudentByQuery(queryParam: QueryParams) {
    try {
      return await this.studentRepo.findStudentByQuery(queryParam);
    } catch (error) {
      throw error;
    }
  }
  async getAllStudents() {
    try {
      return await this.studentRepo.getAllStudents();
    } catch (error) {
      throw error;
    }
  }
  async getStudentById(id: number) {
    try {
      const student = await this.studentRepo.getStudentById(id);
      if (!student) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }
      return student;
    } catch (error) {
      throw error;
    }
  }
  async updateStudent(id: number, std: IStudent) {
    try {
      const student = await this.studentRepo.getStudentById(id);
      if (!student) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }
      return await this.studentRepo.updateStudent(id, std);
    } catch (error) {
      throw error;
    }
  }
  async deleteStudent(id: number) {
    try {
      const student = await this.studentRepo.getStudentById(id);
      if (!student) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }
      return await this.studentRepo.deleteStudent(id);
    } catch (error) {
      throw error;
    }
  }
}
