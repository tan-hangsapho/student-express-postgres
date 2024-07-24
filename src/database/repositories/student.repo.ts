import { AppDataSource } from "..";
import { Student } from "../models/student.model";
import { IStudent } from "./@types/student.type";

export class StudentRepository {
  async createStudent(std: IStudent) {
    try {
      const createStudentRepo = AppDataSource.getRepository(Student);
      const newStd = createStudentRepo.create(std);
      return newStd;
    } catch (error) {
      throw error;
    }
  }
}
